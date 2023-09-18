// Icon Upload Template
const iconUploadTemplate = {
  data: {
    type: "media--icon",
    attributes: {
      name: "",
    },
    relationships: {
      field_media_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
    },
  },
};

// Create Micro-App Template
const createTemplate = {
  data: {
    type: "node--microapp",
    attributes: {
      title: "",
      body: {
        value: "",
        summary: "",
      },
      status: true,
      field_developer: "",
      field_momo: false,
      field_momo_phone: "",
      field_allow_multipage: true,
      field_ozow_max_amount: 0,
      field_ozow_min_amount: 0,
      field_ozow_pay: false,
      field_ozow_sitecode: "",
      field_chat_uri: "",
      field_discovery_uri: "",
      field_user_permissions: [],
      field_use_ayoba_ux_overlay: false,
      field_use_ozow_ux_overlay: false,
      field_contains_purchases: false,
      field_enable_disclaimer: true,
      field_domains: [],
      field_use_proxy: true,
    },
    relationships: {
      field_languages_term: {
        data: [],
      },
      field_category: {
        data: [],
      },
      field_countries_term: {
        data: [],
      },
      field_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
      field_media_image: {
        data: {
          type: "media--icon",
          id: "",
        },
      },
    },
  },
};

// Email Body for Create MIcroApp
const createMicroAppMailTemplate = {
  microAppName: "Micro App",
  returnHTML(){
   return {
      html: String.raw`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
        <!--[if gte mso 9]>
        <xml>
             
           <o:OfficeDocumentSettings>
                  
              <o:AllowPNG/>
                  
              <o:PixelsPerInch>96</o:PixelsPerInch>
                
           </o:OfficeDocumentSettings>
           
        </xml>
        <![endif]-->  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
        <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->  
        <title></title>
              
        <style type="text/css">      @media only screen and (min-width: 710px) {  .u-row {    width: 690px !important;  }  .u-row .u-col {    vertical-align: top;  }  .u-row .u-col-100 {    width: 690px !important;  }}@media (max-width: 710px) {  .u-row-container {    max-width: 100% !important;    padding-left: 0px !important;    padding-right: 0px !important;  }  .u-row .u-col {    min-width: 320px !important;    max-width: 100% !important;    display: block !important;  }  .u-row {    width: 100% !important;  }  .u-col {    width: 100% !important;  }  .u-col > div {    margin: 0 auto;  }}body {  margin: 0;  padding: 0;}table,tr,td {  vertical-align: top;  border-collapse: collapse;}p {  margin: 0;}.ie-container table,.mso-container table {  table-layout: fixed;}* {  line-height: inherit;}a[x-apple-data-detectors=\'true\'] {  color: inherit !important;  text-decoration: none !important;}table, td { color: #000000; } </style>
            
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
          <!--[if IE]>
        <div class="ie-container">
           <![endif]-->  <!--[if mso]>
           <div class="mso-container">
              <![endif]-->  
              <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                   
                 <tbody>
                      
                    <tr style="vertical-align: top">
                           
                       <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                              <!--[if (mso)|(IE)]>
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                             <tr>
                                <td align="center" style="background-color: #e7e7e7;">
                                   <![endif]-->        
                                   <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                        
                                      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 690px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                             
                                         <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                                  <!--[if (mso)|(IE)]>
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                               <tr>
                                                  <td style="padding: 0px;background-color: transparent;" align="center">
                                                     <table cellpadding="0" cellspacing="0" border="0" style="width:690px;">
                                                        <tr style="background-color: transparent;">
                                                           <![endif]-->      <!--[if (mso)|(IE)]>
                                                           <td align="center" width="690" style="width: 690px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top">
                                                              <![endif]-->
                                                              <div class="u-col u-col-100" style="max-width: 320px;min-width: 690px;display: table-cell;vertical-align: top;">
                                                                   
                                                                 <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                                      <!--[if (!mso)&(!IE)]><!-->
                                                                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                                       <!--<![endif]-->  
                                                                       <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                            
                                                                          <tbody>
                                                                                 
                                                                             <tr>
                                                                                      
                                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                                             
                                                                                   <div>
                                                                                          
                                                                                      <h2>MicroApp Testing and Publication Instructions for ${this.microAppName}</h2>
                                                                                          
                                                                                      <p>Dear ${this.microAppName} Team,</p>
                                                                                          
                                                                                      <p>Great news! Your microApp, ${this.microAppName}, is now available for testing on the Ayoba Developer APK. To get the ball rolling, follow the steps below to ensure a smooth testing and publication process:</p>
                                                                                          
                                                                                      <ol>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Download Ayoba Developer APK:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>Download and install the Ayoba Developer APK, which serves as the Ayoba testing environment. This will allow you to check how your microApp behaves in a live environment.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Quality and Functionality Review:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>Review your microApp's quality and functionality thoroughly.</li>
                                                                                                               
                                                                                               <li>Identify and document any open bugs.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Bug Fixes:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>Address any identified issues and make necessary bug fixes.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Testing Checklist:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>Ensure that all forms within your microApp work as expected.</li>
                                                                                                               
                                                                                               <li>Verify that the permissions requested by the microApp are used appropriately.</li>
                                                                                                               
                                                                                               <li>Test end-to-end use cases for both positive and negative scenarios.</li>
                                                                                                               
                                                                                               <li>Ensure that the core functionality of the microApp works flawlessly.</li>
                                                                                                               
                                                                                               <li>Check the general compatibility of the microApp with the Ayoba platform.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>MoMo Payment and Whitelisting (if applicable):</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>If your microApp allows users to use MoMo Payment and has domains or subdomains that need whitelisting, please add those details via the Ayoba Developer Portal.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Publication Request:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>Once testing is concluded and you are satisfied with the performance and quality of your microApp, submit your publication request via the Ayoba Developer Portal or drop us an email.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Vetting, Onboarding, and Compliance Checks:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>We will start with our Vetting, Onboarding, and Compliance checks process as well as Publication to the Ayoba Live app.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                                 
                                                                                         <li>
                                                                                                        <strong>Questions and Clarifications:</strong>            
                                                                                            <ul>
                                                                                                               
                                                                                               <li>If you have any questions or need clarification at any point during this process, please feel free to reach out to us anytime.</li>
                                                                                                           
                                                                                            </ul>
                                                                                                    
                                                                                         </li>
                                                                                             
                                                                                      </ol>
                                                                                          
                                                                                      <p>We are excited to see your microApp in action on Ayoba! Thank you for your hard work, and we look forward to a successful testing and publication process.</p>
                                                                                          
                                                                                      <p>Have an "ayoba" day!</p>
                                                                                        
                                                                                   </div>
                                                                                         
                                                                                </td>
                                                                                    
                                                                             </tr>
                                                                               
                                                                          </tbody>
                                                                          
                                                                       </table>
                                                                         <!--[if (!mso)&(!IE)]><!-->
                                                                    </div>
                                                                    <!--<![endif]-->  
                                                                 </div>
                                                                 
                                                              </div>
                                                              <!--[if (mso)|(IE)]>
                                                           </td>
                                                           <![endif]-->      <!--[if (mso)|(IE)]>
                                                        </tr>
                                                     </table>
                                                  </td>
                                               </tr>
                                            </table>
                                            <![endif]-->    
                                         </div>
                                           
                                      </div>
                                        
                                   </div>
                                         <!--[if (mso)|(IE)]>
                                </td>
                             </tr>
                          </table>
                          <![endif]-->    
                       </td>
                         
                    </tr>
                      
                 </tbody>
                   
              </table>
                <!--[if mso]>
           </div>
           <![endif]-->  <!--[if IE]>
        </div>
        <![endif]-->
     </body>
     
  </html>
  `,
   }
  }
};

module.exports = {
  iconUploadTemplate,
  createTemplate,
  createMicroAppMailTemplate,
};
