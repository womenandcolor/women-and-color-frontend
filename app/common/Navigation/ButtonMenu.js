import React from 'react';
import StyledButton from 'appCommon/StyledButton';

const ButtonMenu = props => {
  return (
    <div>
      {
        props.authed && <StyledButton onClick={props.logout} color={'secondary'}>Log out</StyledButton>
      }
      {props.menuItems.map(item => {
        const link = `/#${item.slug}`;
        return (
          <StyledButton key={item.slug} color={item.color} href={link}>
            {item.title}
          </StyledButton>
        );
      })}
    </div>
  );
};

export default ButtonMenu;
