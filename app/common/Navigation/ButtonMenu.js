import React from 'react';
import StyledButton from 'appCommon/StyledButton';

const ButtonMenu = (props) => {
  return (
    <div>
      {
        props.menuItems.map(item => (
          <StyledButton key={item.slug} color={item.color} href={item.slug}>{item.title}</StyledButton>
        ))
      }
    </div>
  );
}

export default ButtonMenu;