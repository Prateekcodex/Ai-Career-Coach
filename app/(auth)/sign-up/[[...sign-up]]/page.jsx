import React from 'react'
import { SignUp } from '@clerk/nextjs';

const Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="w-full max-w-md px-4">
                <SignUp 
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-2xl border-0 bg-white/10 backdrop-blur-md",
                            headerTitle: "text-white text-2xl font-bold",
                            headerSubtitle: "text-gray-300",
                            socialButtonsBlockButton: "bg-white/20 border-white/30 text-white hover:bg-white/30",
                            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                            footerActionLink: "text-blue-400 hover:text-blue-300"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
