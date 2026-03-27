"use client";
import React from 'react';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, LayoutDashboard, StarsIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { ChevronDown,FileText,PenBox } from 'lucide-react';
// import { checkUser } from "@/lib/checkUser";

const Header = () => {
    // await checkUser();
    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/">
                <Image src="/logo1.jpeg" 
                alt="ASPIRE AI Logo"
                width={200}
                height={60}
                className="h-12 py-1 w-auto object-container"/>
                </Link>
                
                <div className="flex item-center space-x-2 md:space-x-4 justify-start">
                    <SignedIn>
                        <Link href={"/dashboard"}>
                        <Button variant="outline"><LayoutDashboard className='h-4 w-4'/>
                        <span className="hidden md:block">Industry Insights </span></Button>
                        </Link>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 gap-2">
                        <StarsIcon className='h-4 w-4'/>
                        <span className="hidden md:block">Growth Tools </span>
                        <ChevronDown className='h-4 w-4'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={'/resume'} className='flex items-center gap-2'><FileText className='h-4 w-4'/>
                        <span>Build Resume </span></Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem> <Link href={'/ai-cover-letter'} className='flex items-center gap-2'><PenBox className='h-4 w-4'/>Cover Letter
                        </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem> <Link href={'/interview'} className='flex items-center gap-2'><GraduationCap className='h-4 w-4'/>
                        Interview Prep
                        </Link>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        </SignedIn>
                        <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                        </SignedOut>

                        <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avartarBox: "w-10 h-10",
                                userButtonPopoverCard: "shadow-xl",
                                userPreviewMainIdentifier: "font-semibold",
                            },
                        }}/>
                        </SignedIn>
                </div>
            </nav>
        
        </header>
    );
};

export default Header;