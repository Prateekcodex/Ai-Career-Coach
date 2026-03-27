import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/ai-cover-letter(.*)",
  "/interview(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();
    
    if (!userId && isProtectedRoute(req)) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn();
    }
    
    // If user is authenticated and accessing a protected route, 
    // ensure they go through onboarding if needed
    if (userId && isProtectedRoute(req) && !req.nextUrl.pathname.startsWith('/onboarding')) {
      try {
        // Only redirect to onboarding for dashboard, not for other routes
        if (req.nextUrl.pathname === '/dashboard') {
          // Let the dashboard page handle onboarding check
          return NextResponse.next();
        }
      } catch (dbError) {
        console.error('Database error in middleware:', dbError);
        // Continue with the request even if database check fails
      }
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
