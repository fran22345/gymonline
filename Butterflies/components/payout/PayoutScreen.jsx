/* eslint-disable react/prop-types */
import React from 'react';

import paymentIcon from '../../assets/Images/Payout/bankIcon (1).svg';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/feature/authSlice';
import { storeSelector } from '../../store/feature/storeSlice';
import { useDispatch } from 'react-redux';
import { payoutSelector } from '../../store/feature/payout';
import axios from 'axios';

const PayoutScreen = ({ stripe_connect }) => {
  const dispatch = useDispatch();

  const { auth_key } = useSelector(authSelector);
  const { my_stores } = useSelector(storeSelector);
  const { express_login_link } = useSelector(payoutSelector);

  const connectStripBtnAction = () => {
    if (stripe_connect.stripe_connect_onboarding === false) {
      axios
        .post('/api/payment/create_account', {
          data: { account_id: my_stores[0].id },
        })
        .then((res) => {
          window.open(res.data.account_link);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      if (express_login_link !== null) {
        window.open(express_login_link);
      }
    }
  };

  const renderStripStatusView = () => {
    var imageIcon = paymentIcon;
    var buttonTitle = 'View Dashboard';
    var title = 'Waiting for Stripe verification';
    var subTitle = '';

    if (stripe_connect.stripe_connect_onboarding === false) {
      imageIcon = (
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M55.7453 37.7385H64.1823V57.9402H55.7453V37.7385Z"
            fill="#13B58C"
          />
          <path
            d="M39.7641 37.7385H48.2016V57.9402H39.7641V37.7385Z"
            fill="#13B58C"
          />
          <path
            d="M23.7984 37.7385H32.2359V57.9402H23.7984V37.7385Z"
            fill="#13B58C"
          />
          <path
            d="M7.8172 37.7385H16.2542V57.9402H7.8172V37.7385Z"
            fill="#13B58C"
          />
          <path
            d="M66.999 31.4104V29.301H5.0047V31.4104C5.0047 32.5755 5.94898 33.5198 7.11408 33.5198H64.8896C66.0542 33.5198 66.999 32.5755 66.999 31.4104Z"
            fill="#13B58C"
          />
          <path
            d="M69.8894 62.1562H2.11133C0.94623 62.1562 0.00195312 63.1005 0.00195312 64.2656V69.8906C0.00195312 71.0557 0.94623 72 2.11133 72H69.8894C71.0545 72 71.9988 71.0557 71.9988 69.8906V64.2656C71.9988 63.1005 71.0545 62.1562 69.8894 62.1562Z"
            fill="#13B58C"
          />
          <path
            d="M2.10919 25.0796H69.8905C70.8343 25.0796 71.6632 24.4529 71.9203 23.5448C72.1768 22.6368 71.8 21.6684 70.9963 21.174L37.1056 0.313111C36.4278 -0.10437 35.5725 -0.10437 34.8941 0.313111L1.00341 21.174C0.199763 21.6689 -0.177068 22.6368 0.0800119 23.5448C0.337093 24.4529 1.16601 25.0796 2.10919 25.0796ZM34.5661 12.4069H37.4341C38.5992 12.4069 39.5435 13.3512 39.5435 14.5163C39.5435 15.6814 38.5992 16.6256 37.4341 16.6256H34.5661C33.401 16.6256 32.4568 15.6814 32.4568 14.5163C32.4568 13.3512 33.401 12.4069 34.5661 12.4069Z"
            fill="#13B58C"
          />
        </svg>
      );
      title = `Countinue to stripe payout  to receive payments`;
      subTitle =
        'We suggest you to open new stripe connect through this button and come back to this page to authenticate.';
      buttonTitle = 'Connect with Stripe';
    }
    if (
      stripe_connect.payouts_enabled === false &&
      stripe_connect.stripe_connect_onboarding === true
    ) {
      imageIcon = (
        <svg
          width="216"
          height="140"
          viewBox="0 0 216 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39 94.9578C39 98.8238 42.134 101.958 46 101.958H192C195.866 101.958 199 98.8238 199 94.9578C199 91.0918 195.866 87.9578 192 87.9578H186C182.134 87.9578 179 84.8238 179 80.9578C179 77.0918 182.134 73.9578 186 73.9578H205C208.866 73.9578 212 70.8238 212 66.9578C212 63.0918 208.866 59.9578 205 59.9578H183C186.866 59.9578 190 56.8238 190 52.9578C190 49.0918 186.866 45.9578 183 45.9578H119C122.866 45.9578 126 42.8238 126 38.9578C126 35.0918 122.866 31.9578 119 31.9578H62C58.134 31.9578 55 35.0918 55 38.9578C55 42.8238 58.134 45.9578 62 45.9578H22C18.134 45.9578 15 49.0918 15 52.9578C15 56.8238 18.134 59.9578 22 59.9578H47C50.866 59.9578 54 63.0918 54 66.9578C54 70.8238 50.866 73.9578 47 73.9578H7C3.13401 73.9578 0 77.0918 0 80.9578C0 84.8238 3.13401 87.9578 7 87.9578H46C42.134 87.9578 39 91.0918 39 94.9578ZM216 94.9578C216 98.8238 212.866 101.958 209 101.958C205.134 101.958 202 98.8238 202 94.9578C202 91.0918 205.134 87.9578 209 87.9578C212.866 87.9578 216 91.0918 216 94.9578Z"
            fill="#FFEBB6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.873 110.077C142.911 108.122 145.612 105.682 147.37 103.713L139.873 110.077ZM150.205 100.441C151.659 98.6603 152.966 96.7984 154.125 94.8713C156.675 90.633 158.513 86.0794 159.637 81.3848C160.773 76.6368 161.178 71.7444 160.849 66.8877C160.562 62.6497 159.716 58.4389 158.31 54.3748C156.915 50.3428 154.968 46.4552 152.467 42.8289C150.977 40.668 149.29 38.5999 147.407 36.6492C144.641 33.7853 141.607 31.337 138.384 29.3056C134.921 27.123 131.239 25.4218 127.435 24.2039C122.671 22.6786 117.715 21.9114 112.759 21.9058C108.903 21.9015 105.046 22.3582 101.279 23.2778C97.0374 24.3131 92.9092 25.9349 89.0223 28.1458C85.6054 30.0894 82.375 32.4881 79.418 35.3437C75.7019 38.9322 72.6918 42.9775 70.3904 47.3068C68.1373 51.5453 66.5635 56.0562 65.6715 60.6772C64.7525 65.4381 64.5573 70.316 65.0887 75.1337C65.7773 81.3781 67.6865 87.5213 70.8223 93.1776C72.8288 96.797 75.3375 100.217 78.35 103.336C83.1324 108.289 88.7157 111.999 94.6958 114.458C101.968 117.449 109.827 118.591 117.545 117.871C124.023 117.266 130.401 115.349 136.251 112.111"
            fill="white"
          />
          <path
            d="M139.197 109.025C138.616 109.399 138.448 110.173 138.822 110.753C139.195 111.334 139.969 111.501 140.549 111.128L139.197 109.025ZM148.302 104.545C148.762 104.03 148.717 103.24 148.202 102.78C147.687 102.321 146.897 102.366 146.437 102.881L148.302 104.545ZM154.125 94.8713L153.054 94.2269L154.125 94.8713ZM159.637 81.3848L160.852 81.6756L159.637 81.3848ZM160.849 66.8877L162.096 66.8032L160.849 66.8877ZM158.31 54.3748L157.129 54.7835L158.31 54.3748ZM152.467 42.8289L151.438 43.5385L152.467 42.8289ZM147.407 36.6492L146.507 37.5176L147.407 36.6492ZM138.384 29.3056L139.051 28.2481L138.384 29.3056ZM127.435 24.2039L127.054 25.3943L127.435 24.2039ZM112.759 21.9058L112.758 23.1558L112.759 21.9058ZM101.279 23.2778L101.575 24.4921L101.279 23.2778ZM89.0223 28.1458L88.4042 27.0593L89.0223 28.1458ZM79.418 35.3437L80.2863 36.2428L79.418 35.3437ZM70.3904 47.3068L69.2867 46.72L70.3904 47.3068ZM65.6715 60.6772L64.4442 60.4403L65.6715 60.6772ZM65.0887 75.1337L63.8462 75.2708L65.0887 75.1337ZM70.8223 93.1776L71.9155 92.5716L70.8223 93.1776ZM78.35 103.336L79.2492 102.468L78.35 103.336ZM94.6958 114.458L94.2203 115.614L94.6958 114.458ZM117.545 117.871L117.429 116.626L117.545 117.871ZM136.856 113.205C137.46 112.87 137.679 112.11 137.345 111.506C137.01 110.902 136.25 110.683 135.646 111.017L136.856 113.205ZM140.549 111.128C143.69 109.107 146.476 106.592 148.302 104.545L146.437 102.881C144.749 104.772 142.133 107.136 139.197 109.025L140.549 111.128ZM151.174 101.231C152.665 99.4043 154.006 97.4935 155.196 95.5157L153.054 94.2269C151.925 96.1032 150.653 97.9162 149.237 99.6502L151.174 101.231ZM155.196 95.5157C157.813 91.1656 159.7 86.4926 160.852 81.6756L158.421 81.0939C157.327 85.6663 155.537 90.1003 153.054 94.2269L155.196 95.5157ZM160.852 81.6756C162.018 76.8042 162.433 71.7853 162.096 66.8032L159.602 66.9721C159.922 71.7035 159.527 76.4693 158.421 81.0939L160.852 81.6756ZM162.096 66.8032C161.802 62.4559 160.934 58.1359 159.491 53.966L157.129 54.7835C158.499 58.7418 159.322 62.8435 159.602 66.9721L162.096 66.8032ZM159.491 53.966C158.06 49.8289 156.062 45.8399 153.496 42.1193L151.438 43.5385C153.874 47.0705 155.77 50.8567 157.129 54.7835L159.491 53.966ZM153.496 42.1193C151.967 39.9022 150.237 37.781 148.306 35.7809L146.507 37.5176C148.343 39.4188 149.987 41.4338 151.438 43.5385L153.496 42.1193ZM148.306 35.7809C145.47 32.8443 142.358 30.3326 139.051 28.2481L137.718 30.3631C140.857 32.3414 143.812 34.7264 146.507 37.5176L148.306 35.7809ZM139.051 28.2481C135.497 26.0085 131.719 24.263 127.816 23.0134L127.054 25.3943C130.759 26.5806 134.345 28.2374 137.718 30.3631L139.051 28.2481ZM127.816 23.0134C122.928 21.4485 117.844 20.6615 112.76 20.6558L112.758 23.1558C117.586 23.1612 122.413 23.9087 127.054 25.3943L127.816 23.0134ZM112.76 20.6558C108.805 20.6513 104.848 21.1199 100.982 22.0634L101.575 24.4921C105.244 23.5965 109.001 23.1516 112.758 23.1558L112.76 20.6558ZM100.982 22.0634C96.6302 23.1257 92.3936 24.7901 88.4042 27.0593L89.6403 29.2324C93.4248 27.0797 97.4445 25.5004 101.575 24.4921L100.982 22.0634ZM88.4042 27.0593C84.8972 29.0541 81.5826 31.5156 78.5496 34.4445L80.2863 36.2428C83.1674 33.4606 86.3136 31.1246 89.6403 29.2324L88.4042 27.0593ZM78.5496 34.4445C74.738 38.1253 71.6489 42.2763 69.2867 46.72L71.4942 47.8935C73.7347 43.6786 76.6658 39.7391 80.2863 36.2428L78.5496 34.4445ZM69.2867 46.72C66.9742 51.0703 65.3593 55.6992 64.4442 60.4403L66.8988 60.9141C67.7676 56.4131 69.3004 52.0204 71.4942 47.8935L69.2867 46.72ZM64.4442 60.4403C63.5014 65.3247 63.3011 70.3287 63.8462 75.2708L66.3311 74.9967C65.8135 70.3033 66.0037 65.5515 66.8988 60.9141L64.4442 60.4403ZM63.8462 75.2708C64.5526 81.6765 66.5113 87.9796 69.7291 93.7837L71.9155 92.5716C68.8617 87.063 67.002 81.0797 66.3311 74.9967L63.8462 75.2708ZM69.7291 93.7837C71.788 97.4977 74.3618 101.006 77.4508 104.205L79.2492 102.468C76.3132 99.4278 73.8695 96.0962 71.9155 92.5716L69.7291 93.7837ZM77.4508 104.205C82.3552 109.283 88.0836 113.09 94.2203 115.614L95.1712 113.302C89.3479 110.907 83.9095 107.294 79.2492 102.468L77.4508 104.205ZM94.2203 115.614C101.682 118.683 109.744 119.855 117.661 119.115L117.429 116.626C109.91 117.328 102.254 116.215 95.1712 113.302L94.2203 115.614ZM117.661 119.115C124.307 118.495 130.852 116.528 136.856 113.205L135.646 111.017C129.95 114.17 123.739 116.037 117.429 116.626L117.661 119.115Z"
            fill="#E7AD13"
          />
          <path
            d="M159.5 11V17"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M159.5 25V31"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M149.5 21H155.5"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M163.5 21H169.5"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76 115V121"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76 129V135"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M66 125H72"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M80 125H86"
            stroke="#E7AD13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.182 30.6587C96.1432 31.4235 94.1516 32.353 92.2277 33.4473C89.2379 35.1479 86.4113 37.2468 83.8239 39.7454C82.7633 40.7697 81.7684 41.8364 80.8393 42.9404M77.9644 46.7843C77.2256 47.9007 76.5457 49.0451 75.9248 50.2131C75.4662 51.0758 75.0398 51.9514 74.6456 52.8381"
            fill="white"
          />
          <path
            d="M98.621 31.829C99.2674 31.5865 99.5948 30.866 99.3523 30.2196C99.1098 29.5732 98.3893 29.2458 97.7429 29.4883L98.621 31.829ZM92.2277 33.4473L92.8457 34.5339L92.2277 33.4473ZM83.8239 39.7454L82.9556 38.8462L83.8239 39.7454ZM79.8829 42.1356C79.4384 42.6638 79.5062 43.4523 80.0344 43.8968C80.5626 44.3413 81.3512 44.2735 81.7957 43.7453L79.8829 42.1356ZM79.0068 47.4741C79.3878 46.8984 79.2299 46.1229 78.6542 45.7419C78.0785 45.3609 77.3029 45.5188 76.922 46.0945L79.0068 47.4741ZM75.9248 50.2131L77.0286 50.7999L75.9248 50.2131ZM73.5034 52.3302C73.2229 52.9611 73.5069 53.6998 74.1377 53.9803C74.7685 54.2607 75.5073 53.9767 75.7878 53.3459L73.5034 52.3302ZM97.7429 29.4883C95.6429 30.2761 93.5915 31.2335 91.6096 32.3608L92.8457 34.5339C94.7118 33.4724 96.6434 32.5709 98.621 31.829L97.7429 29.4883ZM91.6096 32.3608C88.5297 34.1127 85.6189 36.2743 82.9556 38.8462L84.6922 40.6446C87.2037 38.2193 89.9461 36.1832 92.8457 34.5339L91.6096 32.3608ZM82.9556 38.8462C81.8639 39.9004 80.8396 40.9987 79.8829 42.1356L81.7957 43.7453C82.6971 42.6741 83.6626 41.6389 84.6922 40.6446L82.9556 38.8462ZM76.922 46.0945C76.161 47.2444 75.4607 48.4232 74.8211 49.6264L77.0286 50.7999C77.6308 49.667 78.2902 48.5569 79.0068 47.4741L76.922 46.0945ZM74.8211 49.6264C74.3487 50.515 73.9095 51.4169 73.5034 52.3302L75.7878 53.3459C76.1702 52.4859 76.5838 51.6366 77.0286 50.7999L74.8211 49.6264Z"
            fill="#E7AD13"
          />
        </svg>
      );
      title = 'Waiting for Stripe verification';
      subTitle =
        'Your Stripe connect profile is under verification from Stripe.  If you want to change the information, view the dashboard to change.';
    }
    if (
      stripe_connect.payouts_enabled === true &&
      stripe_connect.stripe_connect_onboarding === true
    ) {
      imageIcon = (
        <svg
          width="216"
          height="137"
          viewBox="0 0 216 137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39 92.9578C39 96.8238 42.134 99.9578 46 99.9578H192C195.866 99.9578 199 96.8238 199 92.9578C199 89.0918 195.866 85.9578 192 85.9578H186C182.134 85.9578 179 82.8238 179 78.9578C179 75.0918 182.134 71.9578 186 71.9578H205C208.866 71.9578 212 68.8238 212 64.9578C212 61.0918 208.866 57.9578 205 57.9578H183C186.866 57.9578 190 54.8238 190 50.9578C190 47.0918 186.866 43.9578 183 43.9578H119C122.866 43.9578 126 40.8238 126 36.9578C126 33.0918 122.866 29.9578 119 29.9578H62C58.134 29.9578 55 33.0918 55 36.9578C55 40.8238 58.134 43.9578 62 43.9578H22C18.134 43.9578 15 47.0918 15 50.9578C15 54.8238 18.134 57.9578 22 57.9578H47C50.866 57.9578 54 61.0918 54 64.9578C54 68.8238 50.866 71.9578 47 71.9578H7C3.13401 71.9578 0 75.0918 0 78.9578C0 82.8238 3.13401 85.9578 7 85.9578H46C42.134 85.9578 39 89.0918 39 92.9578ZM216 92.9578C216 96.8238 212.866 99.9578 209 99.9578C205.134 99.9578 202 96.8238 202 92.9578C202 89.0918 205.134 85.9578 209 85.9578C212.866 85.9578 216 89.0918 216 92.9578Z"
            fill="#C2F1E7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.873 108.077C142.911 106.122 145.612 103.682 147.37 101.713L139.873 108.077ZM150.205 98.4407C151.659 96.6603 152.966 94.7984 154.125 92.8713C156.675 88.633 158.513 84.0794 159.637 79.3848C160.773 74.6368 161.178 69.7444 160.849 64.8877C160.562 60.6497 159.716 56.4389 158.31 52.3748C156.915 48.3428 154.968 44.4552 152.467 40.8289C150.977 38.668 149.29 36.5999 147.407 34.6492C144.641 31.7853 141.607 29.337 138.384 27.3056C134.921 25.123 131.239 23.4218 127.435 22.2039C122.671 20.6786 117.715 19.9114 112.759 19.9058C108.903 19.9015 105.046 20.3582 101.279 21.2778C97.0374 22.3131 92.9092 23.9349 89.0223 26.1458C85.6054 28.0894 82.375 30.4881 79.418 33.3437C75.7019 36.9322 72.6918 40.9775 70.3904 45.3068C68.1373 49.5453 66.5635 54.0562 65.6715 58.6772C64.7525 63.4381 64.5573 68.316 65.0887 73.1337C65.7773 79.3781 67.6865 85.5213 70.8223 91.1776C72.8288 94.797 75.3375 98.2169 78.35 101.336C83.1324 106.289 88.7157 109.999 94.6958 112.458C101.968 115.449 109.827 116.591 117.545 115.871C124.023 115.266 130.401 113.349 136.251 110.111"
            fill="white"
          />
          <path
            d="M139.197 107.025C138.616 107.399 138.448 108.173 138.822 108.753C139.195 109.334 139.969 109.501 140.549 109.128L139.197 107.025ZM148.302 102.545C148.762 102.03 148.717 101.24 148.202 100.78C147.687 100.321 146.897 100.366 146.437 100.881L148.302 102.545ZM154.125 92.8713L153.054 92.2269L154.125 92.8713ZM159.637 79.3848L160.852 79.6756L159.637 79.3848ZM160.849 64.8877L162.096 64.8032L160.849 64.8877ZM158.31 52.3748L157.129 52.7835L158.31 52.3748ZM152.467 40.8289L151.438 41.5385L152.467 40.8289ZM147.407 34.6492L146.507 35.5176L147.407 34.6492ZM138.384 27.3056L139.051 26.2481L138.384 27.3056ZM127.435 22.2039L127.054 23.3943L127.435 22.2039ZM112.759 19.9058L112.758 21.1558L112.759 19.9058ZM101.279 21.2778L101.575 22.4921L101.279 21.2778ZM89.0223 26.1458L88.4042 25.0593L89.0223 26.1458ZM79.418 33.3437L80.2863 34.2428L79.418 33.3437ZM70.3904 45.3068L69.2867 44.72L70.3904 45.3068ZM65.6715 58.6772L64.4442 58.4403L65.6715 58.6772ZM65.0887 73.1337L63.8462 73.2708L65.0887 73.1337ZM70.8223 91.1776L71.9155 90.5716L70.8223 91.1776ZM78.35 101.336L79.2492 100.468L78.35 101.336ZM94.6958 112.458L94.2203 113.614L94.6958 112.458ZM117.545 115.871L117.429 114.626L117.545 115.871ZM136.856 111.205C137.46 110.87 137.679 110.11 137.345 109.506C137.01 108.902 136.25 108.683 135.646 109.017L136.856 111.205ZM140.549 109.128C143.69 107.107 146.476 104.592 148.302 102.545L146.437 100.881C144.749 102.772 142.133 105.136 139.197 107.025L140.549 109.128ZM151.174 99.2312C152.665 97.4043 154.006 95.4935 155.196 93.5157L153.054 92.2269C151.925 94.1032 150.653 95.9162 149.237 97.6502L151.174 99.2312ZM155.196 93.5157C157.813 89.1656 159.7 84.4926 160.852 79.6756L158.421 79.0939C157.327 83.6663 155.537 88.1003 153.054 92.2269L155.196 93.5157ZM160.852 79.6756C162.018 74.8042 162.433 69.7853 162.096 64.8032L159.602 64.9721C159.922 69.7035 159.527 74.4693 158.421 79.0939L160.852 79.6756ZM162.096 64.8032C161.802 60.4559 160.934 56.1359 159.491 51.966L157.129 52.7835C158.499 56.7418 159.322 60.8435 159.602 64.9721L162.096 64.8032ZM159.491 51.966C158.06 47.8289 156.062 43.8399 153.496 40.1193L151.438 41.5385C153.874 45.0705 155.77 48.8567 157.129 52.7835L159.491 51.966ZM153.496 40.1193C151.967 37.9022 150.237 35.781 148.306 33.7809L146.507 35.5176C148.343 37.4188 149.987 39.4338 151.438 41.5385L153.496 40.1193ZM148.306 33.7809C145.47 30.8443 142.358 28.3326 139.051 26.2481L137.718 28.3631C140.857 30.3414 143.812 32.7264 146.507 35.5176L148.306 33.7809ZM139.051 26.2481C135.497 24.0085 131.719 22.263 127.816 21.0134L127.054 23.3943C130.759 24.5806 134.345 26.2374 137.718 28.3631L139.051 26.2481ZM127.816 21.0134C122.928 19.4485 117.844 18.6615 112.76 18.6558L112.758 21.1558C117.586 21.1612 122.413 21.9087 127.054 23.3943L127.816 21.0134ZM112.76 18.6558C108.805 18.6513 104.848 19.1199 100.982 20.0634L101.575 22.4921C105.244 21.5965 109.001 21.1516 112.758 21.1558L112.76 18.6558ZM100.982 20.0634C96.6302 21.1257 92.3936 22.7901 88.4042 25.0593L89.6403 27.2324C93.4248 25.0797 97.4445 23.5004 101.575 22.4921L100.982 20.0634ZM88.4042 25.0593C84.8972 27.0541 81.5826 29.5156 78.5496 32.4445L80.2863 34.2428C83.1674 31.4606 86.3136 29.1246 89.6403 27.2324L88.4042 25.0593ZM78.5496 32.4445C74.738 36.1253 71.6489 40.2763 69.2867 44.72L71.4942 45.8935C73.7347 41.6786 76.6658 37.7391 80.2863 34.2428L78.5496 32.4445ZM69.2867 44.72C66.9742 49.0703 65.3593 53.6992 64.4442 58.4403L66.8988 58.9141C67.7676 54.4131 69.3004 50.0204 71.4942 45.8935L69.2867 44.72ZM64.4442 58.4403C63.5014 63.3247 63.3011 68.3287 63.8462 73.2708L66.3311 72.9967C65.8135 68.3033 66.0037 63.5515 66.8988 58.9141L64.4442 58.4403ZM63.8462 73.2708C64.5526 79.6765 66.5113 85.9796 69.7291 91.7837L71.9155 90.5716C68.8617 85.063 67.002 79.0797 66.3311 72.9967L63.8462 73.2708ZM69.7291 91.7837C71.788 95.4977 74.3618 99.006 77.4508 102.205L79.2492 100.468C76.3132 97.4278 73.8695 94.0962 71.9155 90.5716L69.7291 91.7837ZM77.4508 102.205C82.3552 107.283 88.0836 111.09 94.2203 113.614L95.1712 111.302C89.3479 108.907 83.9095 105.294 79.2492 100.468L77.4508 102.205ZM94.2203 113.614C101.682 116.683 109.744 117.855 117.661 117.115L117.429 114.626C109.91 115.328 102.254 114.215 95.1712 111.302L94.2203 113.614ZM117.661 117.115C124.307 116.495 130.852 114.528 136.856 111.205L135.646 109.017C129.95 112.17 123.739 114.037 117.429 114.626L117.661 117.115Z"
            fill="#1EC7A5"
          />
          <path
            d="M159.5 10.9578V16.9578"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M159.5 24.9578V30.9578"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M149.5 20.9578H155.5"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M163.5 20.9578H169.5"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76.5 113.958V117.958"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M76.5 125.958V129.958"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M68.5 121.958H72.5"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M80.5 121.958H84.5"
            stroke="#1EC7A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.182 28.6587C96.1432 29.4235 94.1516 30.353 92.2277 31.4473C89.2379 33.1479 86.4113 35.2468 83.8239 37.7454C82.7633 38.7697 81.7684 39.8364 80.8393 40.9404M77.9644 44.7843C77.2256 45.9007 76.5457 47.0451 75.9248 48.2131C75.4662 49.0758 75.0398 49.9514 74.6456 50.8381"
            fill="white"
          />
          <path
            d="M98.621 29.829C99.2674 29.5865 99.5948 28.866 99.3523 28.2196C99.1098 27.5732 98.3893 27.2458 97.7429 27.4883L98.621 29.829ZM92.2277 31.4473L92.8457 32.5339L92.2277 31.4473ZM83.8239 37.7454L82.9556 36.8462L83.8239 37.7454ZM79.8829 40.1356C79.4384 40.6638 79.5062 41.4523 80.0344 41.8968C80.5626 42.3413 81.3512 42.2735 81.7957 41.7453L79.8829 40.1356ZM79.0068 45.4741C79.3878 44.8984 79.2299 44.1229 78.6542 43.7419C78.0785 43.3609 77.3029 43.5188 76.922 44.0945L79.0068 45.4741ZM75.9248 48.2131L77.0286 48.7999L75.9248 48.2131ZM73.5034 50.3302C73.2229 50.9611 73.5069 51.6998 74.1377 51.9803C74.7685 52.2607 75.5073 51.9767 75.7878 51.3459L73.5034 50.3302ZM97.7429 27.4883C95.6429 28.2761 93.5915 29.2335 91.6096 30.3608L92.8457 32.5339C94.7118 31.4724 96.6434 30.5709 98.621 29.829L97.7429 27.4883ZM91.6096 30.3608C88.5297 32.1127 85.6189 34.2743 82.9556 36.8462L84.6922 38.6446C87.2037 36.2193 89.9461 34.1832 92.8457 32.5339L91.6096 30.3608ZM82.9556 36.8462C81.8639 37.9004 80.8396 38.9987 79.8829 40.1356L81.7957 41.7453C82.6971 40.6741 83.6626 39.6389 84.6922 38.6446L82.9556 36.8462ZM76.922 44.0945C76.161 45.2444 75.4607 46.4232 74.8211 47.6264L77.0286 48.7999C77.6308 47.667 78.2902 46.5569 79.0068 45.4741L76.922 44.0945ZM74.8211 47.6264C74.3487 48.515 73.9095 49.4169 73.5034 50.3302L75.7878 51.3459C76.1702 50.4859 76.5838 49.6366 77.0286 48.7999L74.8211 47.6264Z"
            fill="#1EC7A5"
          />
          <path
            d="M93.9802 67.3263C92.5239 66.0145 90.2649 66.1152 88.9346 67.5512C87.6043 68.9873 87.7064 71.2149 89.1627 72.5267L105.971 87.6675C108.01 89.5041 111.172 89.3631 113.035 87.3526C113.113 87.2672 113.113 87.2672 113.188 87.1795L137.175 58.7312C138.436 57.2357 138.228 55.0152 136.712 53.7716C135.195 52.5281 132.943 52.7325 131.682 54.2281L109.131 80.9739L93.9802 67.3263Z"
            fill="#C2F1E7"
            stroke="#1EC7A5"
            strokeWidth="2.5"
          />
        </svg>
      );
      title = 'Stripe verification success';
      subTitle =
        'Congratulations, your Stripe account has been connected successfully. Now you can receive payments to the bank account of your choice!';
    }
    if (stripe_connect?.errors?.length !== 0) {
      title = 'Stripe verification failed';
      subTitle = `Verification failed due to “ ${stripe_connect?.errors?.map(
        (error) => error.reason
      )}”. Go to your dashboard and update the relevant details.`;
      imageIcon = (
        <svg
          width="216"
          height="140"
          viewBox="0 0 216 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39 94.9578C39 98.8238 42.134 101.958 46 101.958H192C195.866 101.958 199 98.8238 199 94.9578C199 91.0918 195.866 87.9578 192 87.9578H186C182.134 87.9578 179 84.8238 179 80.9578C179 77.0918 182.134 73.9578 186 73.9578H205C208.866 73.9578 212 70.8238 212 66.9578C212 63.0918 208.866 59.9578 205 59.9578H183C186.866 59.9578 190 56.8238 190 52.9578C190 49.0918 186.866 45.9578 183 45.9578H119C122.866 45.9578 126 42.8238 126 38.9578C126 35.0918 122.866 31.9578 119 31.9578H62C58.134 31.9578 55 35.0918 55 38.9578C55 42.8238 58.134 45.9578 62 45.9578H22C18.134 45.9578 15 49.0918 15 52.9578C15 56.8238 18.134 59.9578 22 59.9578H47C50.866 59.9578 54 63.0918 54 66.9578C54 70.8238 50.866 73.9578 47 73.9578H7C3.13401 73.9578 0 77.0918 0 80.9578C0 84.8238 3.13401 87.9578 7 87.9578H46C42.134 87.9578 39 91.0918 39 94.9578ZM216 94.9578C216 98.8238 212.866 101.958 209 101.958C205.134 101.958 202 98.8238 202 94.9578C202 91.0918 205.134 87.9578 209 87.9578C212.866 87.9578 216 91.0918 216 94.9578Z"
            fill="#FFC5C5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M139.873 110.077C142.911 108.122 145.612 105.682 147.37 103.713L139.873 110.077ZM150.205 100.441C151.659 98.6603 152.966 96.7984 154.125 94.8713C156.675 90.633 158.513 86.0794 159.637 81.3848C160.773 76.6368 161.178 71.7444 160.849 66.8877C160.562 62.6497 159.716 58.4389 158.31 54.3748C156.915 50.3428 154.968 46.4552 152.467 42.8289C150.977 40.668 149.29 38.5999 147.407 36.6492C144.641 33.7853 141.607 31.337 138.384 29.3056C134.921 27.123 131.239 25.4218 127.435 24.2039C122.671 22.6786 117.715 21.9114 112.759 21.9058C108.903 21.9015 105.046 22.3582 101.279 23.2778C97.0374 24.3131 92.9092 25.9349 89.0223 28.1458C85.6054 30.0894 82.375 32.4881 79.418 35.3437C75.7019 38.9322 72.6918 42.9775 70.3904 47.3068C68.1373 51.5453 66.5635 56.0562 65.6715 60.6772C64.7525 65.4381 64.5573 70.316 65.0887 75.1337C65.7773 81.3781 67.6865 87.5213 70.8223 93.1776C72.8288 96.797 75.3375 100.217 78.35 103.336C83.1324 108.289 88.7157 111.999 94.6958 114.458C101.968 117.449 109.827 118.591 117.545 117.871C124.023 117.266 130.401 115.349 136.251 112.111"
            fill="white"
          />
          <path
            d="M139.197 109.025C138.616 109.399 138.448 110.173 138.822 110.753C139.195 111.334 139.969 111.501 140.549 111.128L139.197 109.025ZM148.302 104.545C148.762 104.03 148.717 103.24 148.202 102.78C147.687 102.321 146.897 102.366 146.437 102.881L148.302 104.545ZM154.125 94.8713L153.054 94.2269L154.125 94.8713ZM159.637 81.3848L160.852 81.6756L159.637 81.3848ZM160.849 66.8877L162.096 66.8032L160.849 66.8877ZM158.31 54.3748L157.129 54.7835L158.31 54.3748ZM152.467 42.8289L151.438 43.5385L152.467 42.8289ZM147.407 36.6492L146.507 37.5176L147.407 36.6492ZM138.384 29.3056L139.051 28.2481L138.384 29.3056ZM127.435 24.2039L127.054 25.3943L127.435 24.2039ZM112.759 21.9058L112.758 23.1558L112.759 21.9058ZM101.279 23.2778L101.575 24.4921L101.279 23.2778ZM89.0223 28.1458L88.4042 27.0593L89.0223 28.1458ZM79.418 35.3437L80.2863 36.2428L79.418 35.3437ZM70.3904 47.3068L69.2867 46.72L70.3904 47.3068ZM65.6715 60.6772L64.4442 60.4403L65.6715 60.6772ZM65.0887 75.1337L63.8462 75.2708L65.0887 75.1337ZM70.8223 93.1776L71.9155 92.5716L70.8223 93.1776ZM78.35 103.336L79.2492 102.468L78.35 103.336ZM94.6958 114.458L94.2203 115.614L94.6958 114.458ZM117.545 117.871L117.429 116.626L117.545 117.871ZM136.856 113.205C137.46 112.87 137.679 112.11 137.345 111.506C137.01 110.902 136.25 110.683 135.646 111.017L136.856 113.205ZM140.549 111.128C143.69 109.107 146.476 106.592 148.302 104.545L146.437 102.881C144.749 104.772 142.133 107.136 139.197 109.025L140.549 111.128ZM151.174 101.231C152.665 99.4043 154.006 97.4935 155.196 95.5157L153.054 94.2269C151.925 96.1032 150.653 97.9162 149.237 99.6502L151.174 101.231ZM155.196 95.5157C157.813 91.1656 159.7 86.4926 160.852 81.6756L158.421 81.0939C157.327 85.6663 155.537 90.1003 153.054 94.2269L155.196 95.5157ZM160.852 81.6756C162.018 76.8042 162.433 71.7853 162.096 66.8032L159.602 66.9721C159.922 71.7035 159.527 76.4693 158.421 81.0939L160.852 81.6756ZM162.096 66.8032C161.802 62.4559 160.934 58.1359 159.491 53.966L157.129 54.7835C158.499 58.7418 159.322 62.8435 159.602 66.9721L162.096 66.8032ZM159.491 53.966C158.06 49.8289 156.062 45.8399 153.496 42.1193L151.438 43.5385C153.874 47.0705 155.77 50.8567 157.129 54.7835L159.491 53.966ZM153.496 42.1193C151.967 39.9022 150.237 37.781 148.306 35.7809L146.507 37.5176C148.343 39.4188 149.987 41.4338 151.438 43.5385L153.496 42.1193ZM148.306 35.7809C145.47 32.8443 142.358 30.3326 139.051 28.2481L137.718 30.3631C140.857 32.3414 143.812 34.7264 146.507 37.5176L148.306 35.7809ZM139.051 28.2481C135.497 26.0085 131.719 24.263 127.816 23.0134L127.054 25.3943C130.759 26.5806 134.345 28.2374 137.718 30.3631L139.051 28.2481ZM127.816 23.0134C122.928 21.4485 117.844 20.6615 112.76 20.6558L112.758 23.1558C117.586 23.1612 122.413 23.9087 127.054 25.3943L127.816 23.0134ZM112.76 20.6558C108.805 20.6513 104.848 21.1199 100.982 22.0634L101.575 24.4921C105.244 23.5965 109.001 23.1516 112.758 23.1558L112.76 20.6558ZM100.982 22.0634C96.6302 23.1257 92.3936 24.7901 88.4042 27.0593L89.6403 29.2324C93.4248 27.0797 97.4445 25.5004 101.575 24.4921L100.982 22.0634ZM88.4042 27.0593C84.8972 29.0541 81.5826 31.5156 78.5496 34.4445L80.2863 36.2428C83.1674 33.4606 86.3136 31.1246 89.6403 29.2324L88.4042 27.0593ZM78.5496 34.4445C74.738 38.1253 71.6489 42.2763 69.2867 46.72L71.4942 47.8935C73.7347 43.6786 76.6658 39.7391 80.2863 36.2428L78.5496 34.4445ZM69.2867 46.72C66.9742 51.0703 65.3593 55.6992 64.4442 60.4403L66.8988 60.9141C67.7676 56.4131 69.3004 52.0204 71.4942 47.8935L69.2867 46.72ZM64.4442 60.4403C63.5014 65.3247 63.3011 70.3287 63.8462 75.2708L66.3311 74.9967C65.8135 70.3033 66.0037 65.5515 66.8988 60.9141L64.4442 60.4403ZM63.8462 75.2708C64.5526 81.6765 66.5113 87.9796 69.7291 93.7837L71.9155 92.5716C68.8617 87.063 67.002 81.0797 66.3311 74.9967L63.8462 75.2708ZM69.7291 93.7837C71.788 97.4977 74.3618 101.006 77.4508 104.205L79.2492 102.468C76.3132 99.4278 73.8695 96.0962 71.9155 92.5716L69.7291 93.7837ZM77.4508 104.205C82.3552 109.283 88.0836 113.09 94.2203 115.614L95.1712 113.302C89.3479 110.907 83.9095 107.294 79.2492 102.468L77.4508 104.205ZM94.2203 115.614C101.682 118.683 109.744 119.855 117.661 119.115L117.429 116.626C109.91 117.328 102.254 116.215 95.1712 113.302L94.2203 115.614ZM117.661 119.115C124.307 118.495 130.852 116.528 136.856 113.205L135.646 111.017C129.95 114.17 123.739 116.037 117.429 116.626L117.661 119.115Z"
            fill="#C71E1E"
          />
          <path
            d="M166.571 15.8865L162.329 20.1292"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M156.672 25.7859L152.429 30.0286"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M152.429 15.8864L156.672 20.1291"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M162.329 25.7861L166.571 30.0287"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M82.157 118.301L79.3286 121.129"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M73.6717 126.786L70.8433 129.614"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70.8433 118.3L73.6717 121.129"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M79.3286 126.786L82.157 129.614"
            stroke="#C71E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M98.182 30.6587C96.1432 31.4235 94.1516 32.353 92.2277 33.4473C89.2379 35.1479 86.4113 37.2468 83.8239 39.7454C82.7633 40.7697 81.7684 41.8364 80.8393 42.9404M77.9644 46.7843C77.2256 47.9007 76.5457 49.0451 75.9248 50.2131C75.4662 51.0758 75.0398 51.9514 74.6456 52.8381"
            fill="white"
          />
          <path
            d="M98.621 31.829C99.2674 31.5865 99.5948 30.866 99.3523 30.2196C99.1098 29.5732 98.3893 29.2458 97.7429 29.4883L98.621 31.829ZM92.2277 33.4473L92.8457 34.5339L92.2277 33.4473ZM83.8239 39.7454L82.9556 38.8462L83.8239 39.7454ZM79.8829 42.1356C79.4384 42.6638 79.5062 43.4523 80.0344 43.8968C80.5626 44.3413 81.3512 44.2735 81.7957 43.7453L79.8829 42.1356ZM79.0068 47.4741C79.3878 46.8984 79.2299 46.1229 78.6542 45.7419C78.0785 45.3609 77.3029 45.5188 76.922 46.0945L79.0068 47.4741ZM75.9248 50.2131L77.0286 50.7999L75.9248 50.2131ZM73.5034 52.3302C73.2229 52.9611 73.5069 53.6998 74.1377 53.9803C74.7685 54.2607 75.5073 53.9767 75.7878 53.3459L73.5034 52.3302ZM97.7429 29.4883C95.6429 30.2761 93.5915 31.2335 91.6096 32.3608L92.8457 34.5339C94.7118 33.4724 96.6434 32.5709 98.621 31.829L97.7429 29.4883ZM91.6096 32.3608C88.5297 34.1127 85.6189 36.2743 82.9556 38.8462L84.6922 40.6446C87.2037 38.2193 89.9461 36.1832 92.8457 34.5339L91.6096 32.3608ZM82.9556 38.8462C81.8639 39.9004 80.8396 40.9987 79.8829 42.1356L81.7957 43.7453C82.6971 42.6741 83.6626 41.6389 84.6922 40.6446L82.9556 38.8462ZM76.922 46.0945C76.161 47.2444 75.4607 48.4232 74.8211 49.6264L77.0286 50.7999C77.6308 49.667 78.2902 48.5569 79.0068 47.4741L76.922 46.0945ZM74.8211 49.6264C74.3487 50.515 73.9095 51.4169 73.5034 52.3302L75.7878 53.3459C76.1702 52.4859 76.5838 51.6366 77.0286 50.7999L74.8211 49.6264Z"
            fill="#C71E1E"
          />
          <path
            d="M113 77C115.68 77 118 74.9864 118 72.3269L118 48.6731C118 46.0136 115.68 44 113 44C110.32 44 108 46.0139 108 48.6733L108 72.3269C108 74.9864 110.32 77 113 77Z"
            fill="#FFC5C5"
            stroke="#C71E1E"
            strokeWidth="2"
          />
          <path
            d="M113 83C109.686 83 107 85.6863 107 89C107 92.3137 109.686 95 113 95C116.314 95 119 92.3137 119 89C119 85.6863 116.314 83 113 83Z"
            fill="#FFC5C5"
            stroke="#C71E1E"
            strokeWidth="2"
          />
        </svg>
      );
      buttonTitle = 'View Dashboard';
    }

    return (
      <div className=" w-full sm:w-[600px] bg-white py-9 px-6 flex flex-col  items-center mx-auto mt-9">
        <div>{imageIcon}</div>
        <div>
          <p className=" mt-6 font-semibold text-xl text-center text-black">
            {title}
          </p>
          <p className="w-[90%] text-center text-lg mt-6 mx-auto">{subTitle}</p>
        </div>
        <div className=" flex flex-col jus items-center">
          <button
            className=" w-[200px] py-2 rounded-md text-base text-white  bg-primary my-4"
            onClick={connectStripBtnAction}
          >
            {buttonTitle}
          </button>
          <p className=" text-sm font-normal">You’ll be redirected to Stripe</p>
        </div>
      </div>
    );
  };
  return <div>{renderStripStatusView()}</div>;
};

export default PayoutScreen;
