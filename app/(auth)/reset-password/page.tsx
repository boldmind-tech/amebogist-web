'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { amebogistAPI } from '../../../lib/api';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await amebogistAPI.auth.forgotPassword({ email });
            setEmailSent(true);
            toast.success('Password reset email sent!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setIsLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="w-full max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Check Your Email
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        We've sent a password reset link to <strong>{email}</strong>.
                        Click the link in the email to reset your password.
                    </p>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setEmailSent(false)}
                                className="text-[#00143C] dark:text-[#FFC800] hover:underline font-medium"
                            >
                                try again
                            </button>
                        </p>

                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#00143C] dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Reset Your Password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00143C] dark:focus:ring-[#FFC800] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#00143C] hover:bg-[#00143C]/90 dark:bg-[#FFC800] dark:hover:bg-[#FFC800]/90 text-white dark:text-[#00143C] py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#00143C] dark:hover:text-white transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

