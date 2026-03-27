import React from 'react'
import { redirect } from 'next/navigation';
import { getUserOnboardingStatus } from '@/actions/user'; 
import DashboardViewWrapper from "./_components/DashboardViewWrapper";
import { getIndustryInsights } from '@/actions/dashboard'; 

const IndustryInsightsPage = async () => {
    try {
        const { isOnboarded } = await getUserOnboardingStatus();
        
        if(!isOnboarded) {
            redirect("/onboarding");
        }
        
        const insights = await getIndustryInsights();
        return <div className="container mx-auto">
            <DashboardViewWrapper insights={insights} />
        </div>;
    } catch (error) {
        console.error("Error in dashboard page:", error);
        // Redirect to onboarding if there's an error
        redirect('/onboarding');
    }
};
export default IndustryInsightsPage;