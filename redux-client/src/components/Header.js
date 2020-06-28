import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const Header = (props) => {
    const { user, receiverInfo } = props;

    const logout = () => {
      localStorage.removeItem('document');
      window.location.href = "http://localhost:3000/sign-in";
    }

    const showDropdown = () => {
       document.getElementById('myDropdown').style.display = 'block'
    }

    const handleClick = (e) => {
      console.log(e)
    };
  
    const handleClose = () => {
      // setAnchorEl(null);
    };

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    
    return (
        <div>
          {receiverInfo && receiverInfo.length > 0 && <div className="inline-display mr">{receiverInfo[0].first_name}{' '}{receiverInfo[0].last_name}</div>}
          {user && user.first_name &&
          <React.Fragment>
            <div className="inline-display">
              {user.first_name}{' '}{user.last_name}
            </div>

            <div className="user_img dropdown">
                <div className="profile_header"
                >
                  {user.first_name.charAt(0).toUpperCase()}
                </div>
                <div id="myDropdown" className="dropdown-content">
                  <div onClick={logout} >Logout</div>
                </div>
                <div>
                  {/* <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={true}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} selected={option === 'Logout'} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu> */}
                </div>
            </div>
          </React.Fragment>
        }  
        </div>
      );
}

export default Header;