// // import { useState } from "react";

// // export type ConnectOrganizationRequest = {
// //   name: string;
// //   orgType: "sandbox" | "production";
// //   username: string;
// //   password: string;
// //   securityToken: string;
// // };

// // interface ConnectOrganizationResult {
// //   connectOrganization: (payload: ConnectOrganizationRequest) => Promise<void>;
// //   isLoading: boolean;
// //   errorMessage: string | null;
// //   isSuccess: boolean;
// // }

// // export const useConnectOrganization = (): ConnectOrganizationResult => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //   const [isSuccess, setIsSuccess] = useState(false);

// //   const connectOrganization = async (payload: ConnectOrganizationRequest) => {
// //     setIsLoading(true);
// //     setErrorMessage(null);
// //     setIsSuccess(false);

// //     try {
// //       const response = await fetch("/api/organizations/connect", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //         const { message } = await response.json();
// //         throw new Error(message || "Failed to connect organization");
// //       }

// //       setIsSuccess(true);
// //     } catch (error) {
// //       setErrorMessage(
// //         error instanceof Error ? error.message : "Unexpected error occurred"
// //       );
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return {
// //     connectOrganization,
// //     isLoading,
// //     errorMessage,
// //     isSuccess
// //   };
// // };

// import { useState } from "react";

// export type ConnectOrganizationRequest = {
//   name: string;
//   orgType: "sandbox" | "production";
//   username: string;
//   password: string;
//   securityToken: string;
// };

// interface ConnectOrganizationResult {
//   connectOrganization: (payload: ConnectOrganizationRequest) => Promise<void>;
//   isLoading: boolean;
//   errorMessage: string | null;
//   isSuccess: boolean;
// }

// export const useConnectOrganization = (): ConnectOrganizationResult => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const connectOrganization = async (payload: ConnectOrganizationRequest) => {
//     setIsLoading(true);
//     setErrorMessage(null);
//     setIsSuccess(false);

//     try {
//       await new Promise<void>((resolve, reject) => {
//         setTimeout(() => {
//           if (!payload.username || !payload.password) {
//             reject(new Error("Invalid credentials provided"));
//             return;
//           }

//           resolve();
//         }, 1000);
//       });

//       setIsSuccess(true);
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error ? error.message : "Unexpected error occurred"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     connectOrganization,
//     isLoading,
//     errorMessage,
//     isSuccess
//   };
// };
