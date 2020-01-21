import React from 'react';
import { browserHistory } from "react-router";

export default function Main(props) {
    return (
        <div className="main">
            <div className="sidebar">
                <div className="nav">
                    <div className="logo">
                        <h1>Group 23</h1>
                    </div>
                    <div className="nav-items">
                        <ul>
                            <li onClick={()=> browserHistory.push("/")} className="active">
                                <svg width="40" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="16" fill="#8F9BC1"/></g><g clipPath="url(#clip0)"><path d="M17.7084 11.5018l-7.0419 5.6351v6.0819c0 .1574.0644.3085.179.4198.1146.1114.27.1739.4321.1739l4.2801-.0107c.1615-.0008.3162-.0637.4301-.175.114-.1113.1779-.2618.1779-.4188v-3.5517c0-.1575.0644-.3085.179-.4199.1146-.1113.2701-.1739.4322-.1739h2.4444c.1621 0 .3175.0626.4321.1739.1146.1114.179.2624.179.4199v3.5491c-.0002.0781.0154.1555.046.2278.0306.0722.0756.1379.1323.1932.0568.0554.1242.0993.1985.1292.0743.03.1539.0454.2343.0454l4.2786.0115c.162 0 .3175-.0625.4321-.1739.1146-.1113.179-.2624.179-.4198v-6.086l-7.0404-5.631c-.0828-.0648-.1859-.1001-.2922-.1001s-.2094.0353-.2922.1001zm11.1234 3.8301l-3.1931-2.5572V7.63467c0-.1181-.0483-.23137-.1342-.31488-.086-.08351-.2025-.13043-.3241-.13043h-2.1389c-.1216 0-.2381.04692-.3241.13043-.0859.08351-.1342.19678-.1342.31488v2.69453l-3.4196-2.73349c-.3281-.26237-.7399-.40582-1.1649-.40582-.425 0-.8368.14345-1.1649.40582L7.1656 15.3319c-.04641.0373-.0848.0831-.113.1348-.02819.0517-.04562.1082-.05129.1665-.00568.0582.00051.117.01822.1729.0177.0559.04658.1079.08496.153l.97396 1.1503c.03828.0453.08537.0827.13857.1102.0532.0276.11146.0446.17145.0502.05999.0057.12054-.0003.17817-.0174.05763-.0172.11121-.0452.15768-.0825l8.98408-7.18954c.0828-.06482.1859-.10017.2922-.10017s.2094.03535.2922.10017l8.9845 7.18954c.0464.0373.0999.0654.1574.0826.0576.0172.118.0232.178.0177.0599-.0055.1182-.0225.1714-.0499.0532-.0273.1003-.0647.1387-.1097l.9739-1.1504c.0384-.0454.0671-.0976.0846-.1538.0175-.0561.0234-.1151.0174-.1735-.0061-.0584-.0239-.115-.0526-.1667-.0286-.0516-.0675-.0973-.1143-.1343z" fill="#fff"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M7 6h22v19H7z"/></clipPath><filter id="filter0_d" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="2" dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>
                                Home
                            </li>
                            <li onClick={()=> browserHistory.push("/trading")}>
                                <svg width="40" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="16" fill="#8F9BC1" className="svg-fill"/></g><path d="M25.25 22.625h1.3125c.375 0 .75-.375.75-.75v-13.5c0-.375-.375-.75-.75-.75H25.25c-.375 0-.75.375-.75.75v13.5c0 .375.375.75.75.75zm-11.25 0h1.3125c.375 0 .75-.375.75-.75V10.25c0-.375-.375-.75-.75-.75H14c-.375 0-.75.375-.75.75v11.625c0 .375.375.75.75.75zm5.625 0h1.3125c.375 0 .75-.375.75-.75V14c0-.375-.375-.75-.75-.75H19.625c-.375 0-.75.375-.75.75v7.875c0 .375.375.75.75.75zm-11.25 0h1.3125c.375 0 .75-.375.75-.75V17.75c0-.375-.375-.75-.75-.75H8.375c-.375 0-.75.375-.75.75v4.125c0 .375.375.75.75.75z" fill="#fff"/><defs><filter id="filter0_d" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="2" dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>
                                Trading
                            </li>
                            <li onClick={()=> browserHistory.push("/reports")}>
                                <svg width="40" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="16" fill="#8F9BC1"/></g><path d="M21.75 18H26V9.75c0-.41563-.3344-.75-.75-.75h-12.5c-.4156 0-.75.33437-.75.75v12.5c0 .4156.3344.75.75.75H21v-4.25c0-.4125.3375-.75.75-.75zm4.0312 1.7188l-3.0624 3.0624c-.1407.1407-.3313.2188-.5313.2188H22v-4h4v.1906c0 .1969-.0781.3875-.2188.5282z" fill="#fff"/><defs><filter id="filter0_d" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="2" dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>
                                Reports
                            </li>
                            <li onClick={()=> browserHistory.push("/learning")}>
                                <svg width="40" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="16" fill="#8F9BC1" className="svg-fill"/></g><g clipPath="url(#clip0)"><path d="M27.448 12.7875l-8.7169-2.6782c-.475-.14591-.9875-.14591-1.4622 0l-8.71718 2.6782c-.73563.2259-.73563 1.1987 0 1.4246l1.51968.4669c-.33343.4122-.53843.915-.55874 1.4656-.30094.1725-.51282.4838-.51282.8554 0 .3368.1775.6203.43313.8015l-.79781 3.59c-.06938.3122.16812.6085.48781.6085h1.75343c.32 0 .5575-.2963.4881-.6085l-.7978-3.59c.2556-.1812.4331-.4647.4331-.8015 0-.3616-.2021-.6641-.4893-.8397.0237-.4694.2637-.8844.6465-1.1475l6.1116 1.8778c.2831.0869.8262.1953 1.4622 0l8.7172-2.6781c.7359-.2263.7359-1.1988 0-1.425zm-8.4235 5.059c-.8915.2738-1.6512.1225-2.0497 0l-4.5318-1.3922L11.9998 20c0 1.1046 2.6863 2 6 2 3.3138 0 6-.8954 6-2l-.4431-3.546-4.5322 1.3925z" fill="#fff"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M8 8h20v16H8z"/></clipPath><filter id="filter0_d" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dx="2" dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>
                                Learning
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className="content">
                {/* We use cloneElement here so we can auto pass down props to other components within the tree. */}
                {React.cloneElement(props.children, props)}
            </div>
        </div>
    );
}
