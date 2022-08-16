import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { IoMdLogOut } from 'react-icons/io';

import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '../hooks/useUser';
import styles from '../styles/components/NavBar.module.scss';
interface INavBarProps {
  data: {
    icon?: 'arrowLeft' | 'exit';
    description?: string;
    href: string;
    deleteUser?: boolean;
    logout?: boolean;
  };
}

export const NavBar = ({ data }: INavBarProps) => {
  const { logout } = useUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapperLinks}>
        <Link href="/">
          <a href="/">
            <Image
              src="/assets/logo.svg"
              alt="Ecoleta"
              width={150}
              height={50}
            />
          </a>
        </Link>

        {data?.logout ? (
          <IoMdLogOut
            color="red"
            size={24}
            onClick={() => {
              logout();
            }}
          />
        ) : null}

        <Link href={data?.href}>
          <a href={data?.href} className={styles.link}>
            {data?.icon === 'exit' ? (
              <BiExit color="#34CB79" size={24} />
            ) : (
              <AiOutlineArrowLeft color="#34CB79" size={24} />
            )}

            <span className={styles.textLink}>{data?.description}</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};
