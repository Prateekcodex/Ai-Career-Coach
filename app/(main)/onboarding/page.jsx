import React from 'react'
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { redirect } from 'next/navigation';
import { getUserOnboardingStatus } from "@/actions/user"; 

const OnboardingPage = async () => {
    try {
        const { isOnboarded } = await getUserOnboardingStatus();
        if(isOnboarded) {
            redirect('/dashboard');
        }
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        // Continue to show onboarding form if there's an error
    }
    
    return(
         <main>
        <OnboardingForm industries={industries}/>
    </main>
    )
}
export default OnboardingPage;