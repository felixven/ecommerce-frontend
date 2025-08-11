import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart,FaClipboardList } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import BackDrop from './BackDrop';
import { logOutUser } from '../store/actions';


export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOutHandler = () => {
        dispatch(logOutUser(navigate));
    };

    return (
        <div className='relative z-30'>
            {/* <div
                className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
                onClick={handleClick}
            >
                <Avatar alt='Menu' src='' />
            </div> */}

            <button
                onClick={handleClick}
                className="px-3 py-1 rounded-md text-sm font-semibold text-coffee-dark hover:text-banner-color4 transition flex items-center gap-1">
                {user?.username || 'User'}， 您好！
                <span className="text-xs">▼</span>
            </button>
            <Menu
                sx={{ width: "400px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    sx: { width: 160 },
                    onClick: handleClose,
                }}
            >
                <Link to="/profile" onClick={handleClose}>
                    <MenuItem className="flex gap-2"
                        onClick={handleClose}>
                        <BiUser className='text-xl' />
                        <span className='font-bold text-[16px] mt-1'>
                           {user?.username}
                        </span>
                        {/* refer to line "const {user}" */}
                    </MenuItem>
                </Link>
                <Link to="/orders">
                    <MenuItem className="flex gap-2"
                        onClick={handleClose}>
                        <FaClipboardList className='text-xl' />
                        <span className='font-bold text-[16px] mt-1'>
                            訂單查詢
                        </span>
                        {/* refer to line "const {user}" */}
                    </MenuItem>
                </Link>

                <MenuItem className="flex gap-2"
                    onClick={logOutHandler}>
                    <div className='font-semibold w-full flex gap-2 items-center bg-black px-4 py-1 text-white rounded-sm'>
                        <IoExitOutline className='text-xl' />
                        <span className='font-bold text-[16px] mt-1'>
                            登出
                        </span>
                    </div>
                </MenuItem>


            </Menu>

            {open && <BackDrop />}
        </div>
    );
}