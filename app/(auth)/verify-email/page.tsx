'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Inbox, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { toast } from 'sonner';
import { useAuth, authApi } from '@boldmindng/auth';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const email = searchParams.get('email') || '';
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // If suddenly authenticated (e.g. from clicking the link in another tab)
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Email is missing. please try to register again.');
            return;
        }
        if (code.length < 6) {
            toast.error('Please enter the 6-digit code');
            return;
        }

        setIsVerifying(true);
        try {
            await authApi.verifyEmail(email, code);
            toast.success('Email verified successfully!');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Verification failed. Please check the code.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Email is missing.');
            return;
        }

        setIsResending(true);
        try {
            await authApi.forgotPassword(email);
            toast.success('Verification email resent successfully!');
        } catch (error: any) {
            toast.error('Failed to resend email');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6"
                >
                    <Mail size={40} />
                </motion.div>

                <h1 className="text-3xl font-black text-[#00143C] dark:text-white mb-3">
                    Check Your Email
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    We've sent a verification codes to <span className="font-bold text-gray-900 dark:text-white">{email || 'your email'}</span>
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-900/5 mb-8">
                <form onSubmit={handleVerify} className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Verification Code
                    </label>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            className="w-full py-4 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:border-[#00143C] dark:focus:border-[#FFC800] outline-none transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-300"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isVerifying || code.length < 6}
                        className="w-full py-4 px-6 bg-[#00143C] text-white font-bold rounded-2xl hover:bg-[#00256B] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Verify Account'
                        )}
                    </button>
                </form>

                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Alternatively</h2>

                <div className="space-y-6">
                    <Step
                        icon={<Inbox className="text-blue-500" />}
                        title="Click the magic link"
                        description="You can also click the button in the email to verify instantly."
                    />
                    <Step
                        icon={<ArrowRight className="text-purple-500" />}
                        title="Start building"
                        description="Once verified, you'll be redirected to your dashboard automatically."
                    />
                </div>
            </div>

            <div className="text-center space-y-4">
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                    Didn't receive the email? Check your spam folder or try again.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-[#00143C] dark:text-[#FFC800] font-bold hover:underline disabled:opacity-50"
                    >
                        {isResending ? 'Sending...' : 'Resend Verification Email'}
                    </button>

                    <Link
                        href="/login"
                        className="text-gray-500 dark:text-gray-400 text-sm hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}

function Step({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

