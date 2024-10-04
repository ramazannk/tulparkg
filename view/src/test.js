// To upload a file, such as an image, to Vercel Blob, you can follow these steps:

// 1. **Create a Blob store**: Navigate to the Project you'd like to add the blob store to. Select the Storage tab, 
// then select the Connect Database button. Under the Create New tab, select Blob and then the Continue button. 
// Use the name "Images" and select Create a new Blob store. Select the environments where you would like the read-write
//  token to be included. You can also update the prefix of the Environment Variable in Advanced Options. Once created, 
//  you are taken to the Vercel Blob store page.

// 2. **Prepare your local project**: Since you created the Blob store in a project, the following Environment Variable 
// is automatically created and added to the project for you: `BLOB_READ_WRITE_TOKEN`. To use this Environment Variable 
// locally, pull it with the Vercel CLI: `vercel env pull .env.development.local`.

// 3. **Create a client upload page**: This page allows you to upload files to Vercel Blob. The files will go directly 
// from the browser to Vercel Blob without going through your server. The upload is done securely by exchanging a token with
//  your server before uploading the file.

// Here is a code snippet for creating a client upload page:

// ```javascript
'use client';

// import { type PutBlobResult } from '@vercel/blob';
// import { upload } from '@vercel/blob/client';
// import { useState, useRef } from 'react';

// export default function AvatarUploadPage() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);
//   return (
//     <>
//       <h1>Upload Your Avatar</h1>
//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();
//           const file = inputFileRef.current.files[0];
//           const newBlob = await upload(file.name, file, {
//             access: 'public',
//             handleUploadUrl: '/api/avatar/upload',
//           });
//           setBlob(newBlob);
//         }}
//       >
//         <input name="file" ref={inputFileRef} type="file" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </>
//   );
// }
// ```

// // 4. **Create a client upload route**: The responsibility of this client upload route is to generate tokens for client uploads and listen for completed client uploads, so you can update your database with the URL of the uploaded file for example. The `@vercel/blob` npm package exposes a helper to implement said responsibilities.

// // Here is a code snippet for creating a client upload route:

// // ```javascript
// import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request): Promise<NextResponse> {
//   const body = (await request.json()) as HandleUploadBody;
//   try {
//     const jsonResponse = await handleUpload({
//       body,
//       request,
//       onBeforeGenerateToken: async (
//         pathname,
//         /* clientPayload */
//       ) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
//         return {
//           allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
//           tokenPayload: JSON.stringify({
//             // optional, sent to your server on upload completion
//             // you could pass a user id from auth, or a value from clientPayload
//           }),
//         };
//       },
//       onUploadCompleted: async ({ blob, tokenPayload }) => {
//         // Get notified of client upload completion
//         // ⚠️ This will not work on `localhost` websites,
//         // Use ngrok or similar to get the full upload flow
//         console.log('blob upload completed', blob, tokenPayload);
//         try {
//           // Run any logic after the file upload completed
//           // const { userId } = JSON.parse(tokenPayload);
//           // await db.update({ avatar: blob.url, userId });
//         } catch (error) {
//           throw new Error('Could not update user');
//         }
//       },
//     });
//     return NextResponse.json(jsonResponse);
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 400 }, // The webhook will retry 5 times waiting for a 200
//     );
//   }
// }
// ```
// user: "postgre",
    // host: "localhost",
    // database: "gszokujy",
    // password: "Do1xQBEUa0Mzce7FgIq21eLXJgajbAEa",
    // port: 5432,
// Please note that when your local website is served on `http://localhost:3000`, then the `onUploadCompleted` step won't succeed as Vercel Blob cannot contact your localhost. Instead, it is recommended to run your local application through a tunneling service like [ngrok](https://ngrok.com/), so you can experience the full Vercel Blob development flow locally.