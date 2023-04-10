import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import windowSize from "react-window-size";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/Footer";
import Header from "../../../components/Headers/Header";
import Typography from '../../../components/Typography/TypographyText';

const useStyles = makeStyles((theme) => ({
    media: {

        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


function PrivacyPolicy(props) {
    const classes = useStyles();

    return (

        <div
            className="account-page">
            <div
                className="main-wrapper">
                <div className="home-section home-full-height">
                    <Header />

                    <div className="content" style={{ paddingTop: "180px" }} position="absolute">
                        <div className="container-fluid">
                            <div className="row">
                                <Card >
                                    <CardHeader
                                        title="Privacy Policy"
                                        subheader="Last updated: March 18, 2021"
                                    />
                                    <CardContent style={{ marginLeft: '50px', marginRight: '50px' }}>

                                        <Typography  component="p" variant="body2" isSpan = {false} value = {`This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                                            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.`}></Typography>

                                        <Typography variant = "h4" isGutterBottom = {true} value = "Interpretation and Definitions" isSpan = {false}></Typography>
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Interpretation" isSpan = {false}></Typography>
                                        <Typography  component="p" color="textSecondary" variant="body2" isSpan = {false} value = "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural."></Typography>
                                        <Typography isGutterBottom = {true} variant="h5" isSpan = {false} value = "Definitions"></Typography>
                                        
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "For the purposes of this Privacy Policy:" isSpan = {false}>
                                        <ul>
                                                <li><b>Account</b> means a unique account created for You to access our Service or parts of our Service.</li>
                                                <li><b>Company</b> refers to Imex Platform, Vietnam.</li>
                                                <li><b>Cookies</b> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                                                <li><b>Country</b> refers to: Vietnam.</li>
                                                <li><b>Device</b>  means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                                                <li><b>Personal Data</b> is any information that relates to an identified or identifiable individual.</li>
                                                <li><b>Service</b> refers to the Website.</li>
                                                <li><b>Service Provider</b> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</li>
                                                <li><b>Third-party Social Media Service</b> refers to any website or any social network website through which a User can log in or create an account to use the Service.</li>
                                                <li><b>Usage Data</b> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
                                                <li><b>Website </b> refers to Imex Platform, accessible from https://imex-frontend.herokuapp.com/</li>
                                                <li><b>You </b> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>

                                            </ul>
                                        </Typography>

                                        {/* </Container> */}
                                        <Typography variant = "h4" isGutterBottom = {true} value = "Collecting and Using Your Personal Data" isSpan = {false}></Typography>

                                        {/* <Container> */}
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Types of Data Collected" isSpan = {false}></Typography>

                                        <Typography variant = "h6" isGutterBottom = {true} value = "Personal Data" isSpan = {false}></Typography>

                                        <Typography variant = "body2" color="textSecondary" component="p" value = "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:" isSpan = {false}>
                                        <ul>
                                                <li>Email address</li>
                                                <li>First name and last name</li>
                                                <li>Phone number</li>
                                                <li>Address, State, Province, ZIP/Postal code, City</li>
                                                <li>Usage Data</li>
                                            </ul>
                                        </Typography>

                                        <Typography variant = "h6" isGutterBottom = {true} value = "Usage Data" isSpan = {false}></Typography>

                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Usage Data is collected automatically when using the Service." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device." isSpan = {false}></Typography>

                                        <Typography variant = "h6" isGutterBottom = {true} value = "Tracking Technologies and Cookies" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:" isSpan = {false}>
                                        
                                        <ul>
                                                <li><b>Cookies or Browser Cookies.</b>A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                                                <li><b>Flash Cookies.</b>Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read "Where can I change the settings for disabling, or deleting local shared objects?" available at https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</li>
                                                <li><b>Web Beacons.</b>Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>

                                            </ul>
                                        </Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = {'Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies: Cookies: What Do They Do?.'} isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "We use both Session and Persistent Cookies for the purposes set out below:" isSpan = {false}>

                                        <ul>
                                                <li><b>Necessary / Essential Cookies</b>
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Type: Session Cookies" isSpan = {false}></Typography>
                                                    
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Administered by: Us" isSpan = {false}></Typography>
                                                    
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services." isSpan = {false}></Typography>
                                                </li>
                                                <li>
                                                    <b>Cookies Policy / Notice Acceptance Cookies</b>
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Type: Persistent Cookies" isSpan = {false}></Typography>
                                                    
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Administered by: Us" isSpan = {false}></Typography>
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Purpose: These Cookies identify if users have accepted the use of cookies on the Website." isSpan = {false}></Typography>
                                                </li>
                                                <li>
                                                    <b>Functionality Cookies</b>
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Type: Persistent Cookies" isSpan = {false}></Typography>
                                                    
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Administered by: Us" isSpan = {false}></Typography>
                                                    <Typography variant = "body2" color="textSecondary" component="p" value = "Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website." isSpan = {false}></Typography>
                                                    
                                                </li>
                                            </ul>
                                        </Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy." isSpan = {false}></Typography>

                                        <Typography variant = "h6" isGutterBottom = {true} value = "Use of Your Personal Data" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "The Company may use Personal Data for the following purposes:" isSpan = {false}>

                                        
                                        <ul>
                                                <li><b>To provide and maintain our Service,</b> including to monitor the usage of our Service.</li>
                                                <li><b>To manage Your Account: </b> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                                                <li><b>For the performance of a contract:</b>the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                                                <li><b>To contact You:</b>To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                                                <li><b>To provide You</b>with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
                                                <li><b>To manage Your requests:</b>To attend and manage Your requests to Us.</li>
                                                <li><b>For business transfers: </b> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                                                <li><b>For other purposes:</b>We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                                            </ul>
                                            We may share Your personal information in the following situations:
                                            <ul>
                                                <li><b>With Service Providers: </b>We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                                                <li><b>For business transfers:</b>We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                                                <li><b>With Affiliates: </b>We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                                                <li><b>With business partners: </b>We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                                                <li><b>With other users:</b>when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
                                                <li><b>With Your consent: </b>We may disclose Your personal information for any other purpose with Your consent.</li>
                                            </ul>
                                        </Typography>
                                        <Typography variant = "h6" isGutterBottom = {true} value = "Transfer of Your Personal Data" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information" isSpan = {false}></Typography>

                                        <Typography variant = "h5" isGutterBottom = {true} value = "Disclosure of Your Personal Data" isSpan = {false}></Typography>
                                        <Typography variant = "h6" isGutterBottom = {true} value = "Business Transactions" isSpan = {false}></Typography>

                                        <Typography variant = "body2" color="textSecondary" component="p" value = "If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy." isSpan = {false}></Typography>
                                        <Typography variant = "h6" isGutterBottom = {true} value = "Law enforcement" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency)." isSpan = {false}></Typography>
                                        <Typography variant = "h6" isGutterBottom = {true} value = "Other legal requirements" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:" isSpan = {false}> 
                                            <ul>
                                                <li>Comply with a legal obligation</li>
                                                <li>Protect and defend the rights or property of the Company</li>
                                                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                                                <li>Protect the personal safety of Users of the Service or the public</li>
                                                <li>Protect against legal liability</li>
                                            </ul>

                                        </Typography>
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Security of Your Personal Data" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security." isSpan = {false}></Typography>
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Children's Privacy" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information." isSpan = {false}></Typography>

                                        <Typography variant = "h5" isGutterBottom = {true} value = "Links to Other Websites" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services." isSpan = {false}></Typography>
                                        
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Changes to this Privacy Policy" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page." isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = 'We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.' isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page." isSpan = {false}></Typography>
                                        
                                        <Typography variant = "h5" isGutterBottom = {true} value = "Contact Us" isSpan = {false}></Typography>
                                        <Typography variant = "body2" color="textSecondary" component="p" value = "If you have any questions about this Privacy Policy, You can contact us:" isSpan = {false}>
                                            <ul>
                                                <li>By email: support@ImexPlatform.com</li>
                                                <li>By visiting this page on our website: imex-frontend.herokuapp.com/contact-us</li>
                                            </ul>
                                        </Typography>
                                        {/* </Container> */}
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {/* <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton> */}

                                    </CardActions>

                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer position={"relative"} />
            </div >
        </div >
    );
}

export default windowSize(PrivacyPolicy);
