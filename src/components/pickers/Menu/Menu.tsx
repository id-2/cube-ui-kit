import React, { ReactElement, ReactNode, cloneElement } from 'react';
import { DOMRef, ItemProps } from '@react-types/shared';
import {
  Item as BaseItem,
  Section as BaseSection,
} from '@react-stately/collections';
import { useMenu } from '@react-aria/menu';
import { useSyncRef } from '@react-aria/utils';
import { useDOMRef } from '@react-spectrum/utils';
import { useTreeState } from '@react-stately/tree';

import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  Styles,
} from '../../../tasty';
import { mergeProps } from '../../../utils/react';

import { StyledMenu, StyledMenuHeader } from './styled';
import { MenuItem } from './MenuItem';
import { MenuSection } from './MenuSection';
import { MenuButtonProps, MenuSelectionType } from './MenuButton';
import { useMenuContext } from './context';

import type { AriaMenuProps } from '@react-types/menu';

export interface CubeMenuProps<T>
  extends ContainerStyleProps,
    AriaMenuProps<T> {
  selectionIcon?: MenuSelectionType;
  header?: ReactNode;
  footer?: ReactNode;
  styles?: Styles;
  qa?: BaseProps['qa'];
}

function Menu<T extends object>(
  props: CubeMenuProps<T>,
  ref: DOMRef<HTMLUListElement>,
) {
  const { header, footer, selectionIcon, qa } = props;
  const domRef = useDOMRef(ref);
  const contextProps = useMenuContext();
  const completeProps = mergeProps(contextProps, props);

  const state = useTreeState(completeProps);
  const items = [...state.collection];
  const hasSections = items.some((item) => item.type === 'section');

  const { menuProps } = useMenu(completeProps, state, domRef);
  const styles = extractStyles(completeProps, CONTAINER_STYLES);

  const defaultProps = {
    qa,
    styles,
    mods: {
      sections: hasSections,
      footer: !!footer,
      header: !!header,
    },
  };

  useSyncRef(contextProps, domRef);

  return (
    <StyledMenu
      {...mergeProps(defaultProps, menuProps, filterBaseProps(completeProps))}
      ref={domRef}
    >
      {header && <StyledMenuHeader>{header}</StyledMenuHeader>}
      {items.map((item) => {
        if (item.type === 'section') {
          return (
            <MenuSection
              key={item.key}
              item={item}
              state={state}
              selectionIcon={selectionIcon}
              onAction={completeProps.onAction}
            />
          );
        }

        let menuItem = (
          <MenuItem
            key={item.key}
            item={item}
            state={state}
            selectionIcon={selectionIcon}
            onAction={completeProps.onAction}
          />
        );

        if (item.props.wrapper) {
          menuItem = item.props.wrapper(menuItem);
        }

        return cloneElement(menuItem, {
          key: item.key,
        });
      })}
    </StyledMenu>
  );
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Menu = React.forwardRef(Menu) as <T>(
  props: CubeMenuProps<T> & { ref?: DOMRef<HTMLUListElement> },
) => ReactElement;

type PartialMenuButton = Partial<MenuButtonProps>;

type ItemComponent = <T>(
  props: ItemProps<T> &
    PartialMenuButton & { wrapper?: (item: ReactElement) => ReactElement },
) => JSX.Element;

type SectionComponent = typeof BaseSection;

const Item = Object.assign(BaseItem, {
  displayName: 'Item',
}) as ItemComponent;

const Section = Object.assign(BaseSection, {
  displayName: 'Section',
}) as SectionComponent;

type __MenuComponent = typeof _Menu & {
  Item: typeof Item;
  Section: typeof Section;
};

const __Menu = Object.assign(_Menu as __MenuComponent, {
  Item,
  Section,
  displayName: 'Menu',
});

__Menu.displayName = 'Menu';

export { __Menu as Menu };
