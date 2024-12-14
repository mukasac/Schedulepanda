
import { SocialScheduler } from "@/components/social-scheduler"
import { currentUser } from '@clerk/nextjs/server';
import { API_URL } from 'network/api';


export default function SchedulerPage() {

  return <SocialScheduler />
}