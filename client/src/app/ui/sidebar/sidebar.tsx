"use client";
import {
  HomeRounded,
  HistoryRounded,
  BookmarkBorderRounded,
  CreditCardRounded,
  PersonOutlineRounded,
  HeadsetMicOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import styles from "./slidebar.module.css";
import Link from "next/link";

const InDriveLogo =
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/InDrive_Logo.svg/960px-InDrive_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20260502014542";

const navigation = [
  {
    label: "HOME",
    href: "/dashboard",
    Icon: HomeRounded,
  },
  {
    label: "My Rides",
    href: "/my-rides",
    Icon: HistoryRounded,
  },
  {
    label: "Saved Places",
    href: "/saved-places",
    Icon: BookmarkBorderRounded,
  },
  {
    label: "Payments",
    href: "/payments",
    Icon: CreditCardRounded,
  },
  {
    label: "Profile",
    href: "/profile",
    Icon: PersonOutlineRounded ,
  },
];

export default function sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Box component={"span"} className={styles.logo}>
        <Box component="img" src={InDriveLogo} className={styles.image} />
      </Box>

      <nav className={styles.navigation}>
        {navigation.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link 
            key={href}
            href={href}
            className={`${styles.navItem} ${
                active ? styles.active : ""
              }`}
            >
              <Icon className={styles.navIcon} />
              <span>{label}</span>
            </Link> 
          );
        })}
      </nav>

      <div className={styles.support}>
        <Link href="/support" className={styles.supportLink}>
          <HeadsetMicOutlined className={styles.navIcon} />

          <span className={styles.supportText}>
            <span>Support</span>
            <span className={styles.supportSubtitle}>
              Help &amp; safety
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
