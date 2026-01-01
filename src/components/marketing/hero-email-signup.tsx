'use client'

import { AlertCircleIcon, CheckCircleIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HeroEmailSignup = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/email-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save email');
            }

            setSuccess(true);

            // Redirect to contact page with email parameter after a brief delay
            setTimeout(() => {
                router.push(`/contact?email=${encodeURIComponent(email.trim())}`);
            }, 1500);

        } catch (error: unknown) {
            console.error('Email signup error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative overflow-hidden">
                {!success ? (
                    <div className="transition-all duration-700 ease-in-out transform">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 text-base bg-background border-border focus:border-primary"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex justify-center sm:justify-start">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading || !email.trim()}
                                    className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-[180px] flex items-center justify-center"
                                >
                                    <span className="inline-flex items-center">
                                        {isLoading && (
                                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        <span className="transition-all duration-200">
                                            {isLoading ? "Getting Started..." : "Get Started"}
                                        </span>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="transition-all duration-700 ease-in-out transform animate-in fade-in slide-in-from-top-1">
                        <div className="flex items-center justify-center gap-2 p-4 bg-background border border-border rounded-lg h-12">
                            <CheckCircleIcon className="size-5 text-primary" />
                            <span className="text-foreground font-medium">
                                Success! Redirecting you to get started...
                            </span>
                        </div>
                    </div>
                )}
                
                {/* Animated error message that slides down from behind the input */}
                {error && !success && (
                    <div className="overflow-hidden animate-in slide-in-from-top-2 duration-300 ease-out mt-3">
                        <div className="flex items-center gap-2 p-3 bg-background border border-destructive/50 rounded-lg">
                            <AlertCircleIcon className="size-4 text-destructive flex-shrink-0" />
                            <span className="text-destructive text-sm">
                                {error}
                            </span>
                        </div>
                    </div>
                )}
                
                {!success && (
                    <div className="transition-opacity duration-700 ease-in-out">
                        <p className="text-xs text-muted-foreground text-center mt-3">
                            Enter your email to get started with AI-powered booking management
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroEmailSignup;