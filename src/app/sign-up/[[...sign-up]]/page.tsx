// src/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp} from "@clerk/nextjs";
 
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            card: "bg-white dark:bg-gray-800 shadow-xl",
            headerTitle: "text-gray-900 dark:text-white text-2xl font-bold",
            headerSubtitle: "text-gray-600 dark:text-gray-300",
            socialButtonsBlockButton: "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            footerActionLink: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
          }
        }}
      />
    </div>
  );
}
