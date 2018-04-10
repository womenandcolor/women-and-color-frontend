import React from 'react';
import StyledButton from 'appCommon/StyledButton';

const ButtonMenu = props => {
  return (
    <div>
      {props.menuItems.map(item => {
        const link = item.slug.startsWith('/accounts')
          ? item.slug
          : `/#${item.slug}`;
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
