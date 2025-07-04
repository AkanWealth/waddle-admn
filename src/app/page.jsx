// 'use client';

import Image from "next/image"
import Header from "./component/Headers/Headers"
import ImageFiles from "@/assets/images"
import SVGAssets from "@/assets/svg"

// import { useAuth } from '@/context/AuthContext';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const HomePage = () => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated === undefined) return;

//     const targetRoute = isAuthenticated ? '/dashboard' : '/login';
//     router.replace(targetRoute);
//   }, [isAuthenticated, router]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.loader}></div>
//       <p style={styles.text}>Redirecting...</p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f9f9f9',
//   },
//   loader: {
//     border: '6px solid #f3f3f3',
//     borderTop: '6px solid #0070f3',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     animation: 'spin 1s linear infinite',
//   },
//   text: {
//     marginTop: '16px',
//     fontSize: '16px',
//     color: '#666',
//   },
// };

// // Add CSS animation globally (if using a global stylesheet or CSS-in-JS)
// const styleSheet = `
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// `;

// // Inject the style for the animation if needed (quick inline solution)
// if (typeof window !== 'undefined') {
//   const styleTag = document.createElement('style');
//   styleTag.innerHTML = styleSheet;
//   document.head.appendChild(styleTag);
// }

// export default HomePage;



const HomePage = () => {
  return (
<section className="bg-white h-screen">
  <Header />
  <section className="bg-[#2853A6] flex justify-between ">
    <section className="">
      <h3 className="text-[56px] font-bold">Discover things to do with your kids</h3>
      <p className="">From exciting adventures to quiet moments, Waddle helps you find and book child-friendly experiences effortlessly, all in one easy-to-use app.</p>
    <section className="flex items-center">
      <button type="button">
        <Image src={SVGAssets.DownloadViaApple} alt="Download via Apple" className="w-[200px] h-[60px] mb-4" />
      </button>
       <button type="button">
        <Image src={SVGAssets.DownloadViaGoogle} alt="Download via Google" className="w-[200px] h-[60px]" />
       </button>
    </section>
    </section>  
    <section className="w-[386px] h-[509px]"> 
      <Image src={ImageFiles.HeroImage} alt="Hero Image" className="h-full w-full" />
    </section>
  </section>
</section>
  )
}

export default HomePage