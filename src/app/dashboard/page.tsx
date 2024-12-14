import { SocialScheduler } from '@/components/social-scheduler'
import { currentUser } from '@clerk/nextjs/server';
import { API_URL } from 'network/api';

export default async function DashboardPage() {

  const user = await currentUser();

  if(!user){
     return 
  }
 
  //check if user is registered in the backend
  //If they are not registered register
  const data = await fetch(`${API_URL}/check/user/status/${user.id}`)
  let response =   await data.json()
  //TODO handle registration errors
  console.log(response)
  

  return <SocialScheduler />
}