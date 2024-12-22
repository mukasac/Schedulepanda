import { NextResponse } from "next/server"


const clientID = "77qfomi01tomrr"
const secret = "WPL_AP1.yqGImzZh99t5O8ss.QuL7Hg=="
const redirectUrl = "http://localhost:3000/scheduler"
const state = "er4456096955943ee"

export async function POST(req:Request){
  try {
     const {code} = await req.json()
    
        const params = new URLSearchParams({
          grant_type:'authorization_code',
          code:code,
          client_id:clientID,
          client_secret:secret,
          redirect_uri: redirectUrl,
        });

        const url =`https://www.linkedin.com/oauth/v2/accessToken`;

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('LinkedIn API Error Response:', errorText);
            throw new Error(`Failed to get access token: ${response.statusText} - ${errorText}`);
          }

          const data = await response.json();
          return NextResponse.json({
            token:data.access_token
          })

    
  } catch (error) {
     console.log(error)
     return NextResponse.json({
        token:null
      })
  }
}