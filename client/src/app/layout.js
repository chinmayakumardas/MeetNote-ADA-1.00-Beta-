// 'use client'
// import "./globals.css";

// import { Provider } from 'react-redux'; // Import Redux Provider
// import { store } from '@/redux/store'; // Import the store

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body >
//       <Provider store={store}> {/* Wrap your components with Provider */}
//         {children}
//     </Provider>
//       </body>
//     </html>
//   );
// }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
