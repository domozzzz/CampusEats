
import homepage from '../images/Homepage.png'
import '../css/TermsAndConditions.css'

/**
 * Terms and conditions page
 * @returns simple terms and conditions page
 */
export default function TermsAndConditions() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div class="terms" alt="Avatar" style={{ width: "100%", height: "fit-content" }}>
                <h1>Terms and Conditions(“Terms”)</h1>
                <h2>CampusEats Terms and Conditions: (Last updated on 04/10/2024)</h2>
                <p>Welcome to CampusEats! By using our website and services, you agree to the following terms and conditions. Please read these carefully before using CampusEats platform. If you do not agree with any part of these terms, you should not use our services.</p>
                <h2>1. General Information</h2>
                <p>
                    1.1 <b>Agreement to Terms</b>: By accessing or using CampusEats, you agree to be bound by these terms and conditions,
                        as well as our Privacy Policy.
                    1.2 <b>Modifications</b>: We reserve the right to modify these terms at any time.
                        Any changes will be notified via the website or by email, and your continued use of the platform signifies your acceptance of the updated terms.
                </p>
                <h2>2. Use of Service</h2>
                <p>
                    2.1 <b>Eligibility</b>: You must be a university student or have the legal capacity to use CampusEats and agree to abide by these terms.<br />
                    2.2 <b>Account Creation</b>: You are required to create an account to access specific features of CampusEats. You agree to provide accurate,<br />
                        complete information during the registration process and keep it up-to-date.<br />
                    2.3 <b>Account Security</b>: You are responsible for maintaining the confidentiality of your account information and
                        for any activity that occurs under your account. Notify us immediately if you suspect any unauthorized use of your account.<br />
                    2.4 <b>Prohibited Conduct</b>: You agree not to use CampusEats for any unlawful activities, including but not limited to:
                    <ul>
                        <li>Posting inappropriate, harmful, or defamatory content.</li>
                        <li>Uploading content that infringes the intellectual property rights of others.</li>
                        <li>Committing fraud, hacking, or violating the platform’s security.</li>
                    </ul>
                </p>
                <h2>3. User-Generated Content</h2>
                <p>
                    3.1 <b>Uploading Meal Kits</b>: Users can upload their own meal kits to share with the CampusEats community.
                        By uploading content, you grant CampusEats the non-exclusive, royalty-free right to use, modify, distribute,
                        and display your content on the platform.<br />
                    3.2 <b>Content Responsibility</b>: You are solely responsible for the content you upload.
                        You confirm that your content complies with all relevant laws and does not infringe on the rights of any third parties.<br />
                    3.3 <b>Earnings from Uploaded Meals</b>: Users who upload meal kits to CampusEats will receive <b>$0.50</b> for every order of their
                    uploaded meal kit made through the platform. Payments will be processed monthly,
                        and you must provide accurate payment details to receive compensation.<br />
                    3.4 <b>Content Removal</b>: CampusEats reserves the right to remove any content that violates these terms or is deemed inappropriate,
                        without prior notice.<br />
                </p>
                <h2>4. Orders and Payments</h2>
                <p>
                    4.1 <b>Placing Orders</b>: CampusEats allows users to order customized meal kits. Once an order is placed, it cannot be canceled or refunded.<br />
                    4.2 <b>Refunds Policy</b>: <b>Refunds are not allowed</b> under any circumstances,
                        except in cases where the meal kit is not delivered due to a failure by CampusEats.<br />
                        Please check your order details carefully before placing an order.<br />
                    4.3 <b>Pricing</b>: All prices displayed on the platform are in local currency and include any applicable taxes.
                        CampusEats reserves the right to modify pricing at any time without notice.<br />
                    4.4 <b>Payments</b>: Payments for orders must be made in full at the time of placing the order.
                        We accept major credit cards and other approved payment methods.
                </p>
                <h2>5. Intellectual Property</h2>
                <p>
                    5.1 <b>Ownership</b>: All content on CampusEats, except user-generated content, is the intellectual property of CampusEats or its licensors.
                        You may not use, reproduce, or distribute any materials on CampusEats without prior written consent.<br />
                    5.2 <b>License for Uploaded Content</b>: By uploading meal kits, you grant CampusEats a perpetual, non-exclusive,
                        royalty-free license to use, display, and modify your content across the platform.<br />
                </p>
                <h2>6. Privacy and Data Security</h2>
                <p>
                    6.1 <b>Privacy Policy</b>: By using CampusEats, you agree to our Privacy Policy, which outlines how we collect, use, and store your data.<br />
                    6.2 <b>Data Security</b>: We are committed to safeguarding your personal information. However, we cannot guarantee absolute security,
                        and you acknowledge that you use the platform at your own risk.
                </p>
                <h2>7. Liability and Disclaime</h2>
                <p>
                    7.1 <b>Service Availability</b>: While CampusEats aims to provide uninterrupted access to the platform,
                        we do not guarantee continuous availability. We reserve the right to modify, suspend,
                        or discontinue any part of the platform without prior notice.<br />
                    7.2 <b>Limitation of Liability</b>: CampusEats will not be liable for any damages arising from the use or inability
                        to use the platform, including but not limited to any errors, inaccuracies, or service interruptions.<br />
                    7.3 <b>Health and Nutrition Information</b>: The nutritional information provided on CampusEats is for general
                        informational purposes only. We do not guarantee the accuracy of this information and recommend consulting
                        a healthcare professional for personalized dietary advice.
                </p>
                <h2>8. Third-Party Links and Services</h2>
                <p>
                    8.1 <b>Third-Party Websites:</b> CampusEats may contain links to third-party websites or services.
                        We are not responsible for the content, privacy policies, or practices of any third-party websites.<br />
                    8.2 <b>Third-Party Integrations:</b> CampusEats integrates with payment providers and other third-party services.
                        By using these services, you agree to comply with their respective terms.<br />
                </p>
                <h2>9. Termination</h2>
                <p>
                    9.1 <b>Termination by CampusEats</b>: CampusEats reserves the right to suspend or terminate your account
                     if you violate any of these terms or engage in activities that harm the platform or other users.<br />
                    9.2 <b>Termination by User</b>: You may terminate your account at any time by contacting us.
                     Upon termination, we will deactivate your account and handle your data in accordance with our Privacy Policy.
                </p>
                <h2>10. Governing Law and Dispute Resolution</h2>
                <p>
                    10.1 <b>Governing Law</b>: These terms are governed by the laws of The Government of Australia,
                        without regard to conflict of law principles.<br />
                    10.2 <b>Dispute Resolution</b>: In the event of a dispute, you agree to resolve it through negotiation or mediation.
                        If the dispute cannot be resolved, it will be subject to the jurisdiction of the courts in Australia.<br />
                </p>
                <h2>11. Contact Information</h2>
                <p>
                    If you have any questions or concerns about these Terms and Conditions, please contact us at:
                </p>
                <p>
                    <b>CampusEats</b>
                    Email: admin@campuseats.net
                </p>
            </div>
        </div>
    );
}

