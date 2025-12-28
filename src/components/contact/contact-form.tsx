'use client'

import { AlertCircleIcon, CheckCircleIcon, LoaderIcon, UploadIcon } from "lucide-react"
import React, { useState } from 'react'
import Container from "../global/container"
import Wrapper from "../global/wrapper"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
  files?: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [files, setFiles] = useState<FileList | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [isPreviousSubmission, setIsPreviousSubmission] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    setFiles(selectedFiles)
    
    // Validate files
    if (selectedFiles) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'text/csv',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ]

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        if (file.size > maxSize) {
          setErrors(prev => ({ ...prev, files: `File ${file.name} is too large. Maximum size is 10MB.` }))
          return
        }
        if (!allowedTypes.includes(file.type)) {
          setErrors(prev => ({ ...prev, files: `File ${file.name} has an unsupported format.` }))
          return
        }
      }
      
      setErrors(prev => ({ ...prev, files: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus('idle')

    try {
      const submitFormData = new FormData()
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value)
      })
      
      // Add files if any
      if (files) {
        for (let i = 0; i < files.length; i++) {
          submitFormData.append('files', files[i])
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitFormData,
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        }
        throw new Error(data.message || 'Something went wrong')
      }

      setSubmitStatus('success')
      setSubmitMessage(data.message || 'Thank you for your message! We\'ll get back to you soon.')
      setIsPreviousSubmission(data.previousSubmission || false)
      
      // Only reset form if this is a new submission (not a duplicate)
      if (!data.previousSubmission) {
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
        setFiles(null)
        
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      }

    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full pb-16 lg:pb-24">
      <Wrapper>
        <Container delay={0.1}>
          <div className="flex flex-col lg:items-center lg:justify-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-left lg:text-center">
              Contact Us
            </h2>
          </div>
        </Container>

        <Container delay={0.2}>
          {submitStatus === 'success' && (
            <Alert className="max-w-3xl mx-auto mb-6 bg-background border-border text-foreground">
              <CheckCircleIcon className="h-4 w-4" />
              <AlertDescription>{submitMessage}</AlertDescription>
            </Alert>
          )}
          
          {submitStatus === 'error' && (
            <Alert className="max-w-3xl mx-auto mb-6 bg-background border-border text-foreground">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertDescription>{submitMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto w-full mt-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name*
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`bg-[#0A0A0A] border-border/50 ${errors.firstName ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name*
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`bg-[#0A0A0A] border-border/50 ${errors.lastName ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject*
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Type your subject here"
                className={`bg-[#0A0A0A] border-border/50 ${errors.subject ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Work Email*
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                className={`bg-[#0A0A0A] border-border/50 ${errors.email ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                How can we help you?*
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                className={`min-h-[150px] bg-[#0A0A0A] border-border/50 resize-none ${errors.message ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="file-upload"
                className={`flex items-center justify-center gap-2 px-4 py-8 rounded-lg border border-dashed border-border/50 bg-[#0A0A0A] cursor-pointer hover:border-border/80 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <UploadIcon className="size-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {files && files.length > 0 
                    ? `${files.length} file(s) selected` 
                    : 'Drop your files here or click to upload'}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
                />
              </label>
              {errors.files && (
                <p className="text-sm text-red-500">{errors.files}</p>
              )}
              {files && files.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Selected files:</p>
                  <ul className="list-disc list-inside mt-1">
                    {Array.from(files).map((file, index) => (
                      <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon className="size-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Container>
      </Wrapper>
    </div>
  )
};

export default ContactForm
