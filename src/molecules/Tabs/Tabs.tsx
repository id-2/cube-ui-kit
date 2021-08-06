import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Block } from '../../components/Block';
import { Space } from '../../components/Space';
import { CubeFlexProps, Flex } from '../../components/Flex';
import { Button, CubeButtonProps } from '../../atoms/Button/Button';
import { NuStyles } from '../../styles/types';

export interface CubeTabData {
  id: string;
  qa?: string;
  title?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
}

export interface CubeTabsContextValue {
  addTab: (CubeTabData) => void;
  setTab: (string) => void;
  removeTab: (CubeTabData) => void;
  changeTab: (CubeTabData) => void;
  currentTab: string;
}

const TabsContext = createContext<CubeTabsContextValue>({
  addTab() {},
  removeTab() {},
  setTab() {},
  changeTab() {},
  currentTab: '',
});

const TABS_PANEL_CSS = `
  position: relative;
  overflow: auto hidden;
  top: 1px;
  white-space: nowrap;

  ::-webkit-scrollbar-track {
    background: var(--grey-light-color);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1px;
    background: var(--dark-04-color);
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
`;

const TABS_CONTAINER_CSS = `
  position: relative;

  &::before {
    content: '';
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 32px;
    height: 37px;
    transition: all .15s linear;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    z-index: 10;
  }

  &::after {
    content: '';
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 37px;
    pointer-events: none;
    transition: all .15s linear;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    z-index: 10;
  }

  &[data-is-left-fade]::before, &[data-is-right-fade]::after {
    opacity: 1;
  }
`;

export interface CubeTabProps extends CubeButtonProps {
  isSelected?: boolean;
  isHidden?: boolean;
  onClose?: () => void;
}

const Tab = ({ isSelected, isHidden, onClose, ...props }: CubeTabProps) => {
  return (
    <Button type="tab" isSelected={isSelected} isHidden={isHidden} {...props} />
  );
};

export interface CubeTabsProps extends CubeFlexProps {
  /** The initial active key in the tabs (uncontrolled). */
  defaultActiveKey?: string;
  /** The currently active key in the tabs (controlled). */
  activeKey?: string;
  /** Handler that is called when the tab is clicked. */
  onTabClick?: (string) => void;
  /** Handler that is called when the tab is closed. */
  onTabClose?: (string) => void;
  /** Styles for the each tab pane */
  paneStyles?: NuStyles;
  /** Additional content along the tabs */
  extra?: ReactNode;
}

export function Tabs({
  defaultActiveKey,
  activeKey: activeKeyProp,
  onTabClick,
  onTabClose,
  paneStyles,
  extra,
  children,
  ...props
}) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const [tabs, setTabs] = useState<CubeTabData[]>([]);
  const [activeKey, setActiveKey] = useState(activeKeyProp || defaultActiveKey);

  const [leftFade, setLeftFade] = useState<boolean>(false);
  const [rightFade, setRightFade] = useState<boolean>(false);

  function updateScroll() {
    const el = tabsRef && tabsRef.current;

    if (!el) return;

    setLeftFade(!!el.scrollLeft);
    setRightFade(
      el.scrollWidth !== el.offsetWidth
        && !!(el.scrollWidth - el.offsetWidth - el.scrollLeft),
    );
  }

  useLayoutEffect(updateScroll, [tabs]);

  function scrollCurrentIntoView() {
    const el = tabsRef && tabsRef.current;

    if (!el) return;

    const current = el.querySelector('button[disabled]');

    if (!current) return;

    current.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'end' });
  }

  useEffect(() => {
    function update() {
      updateScroll();
    }

    if (tabsRef && tabsRef.current) {
      tabsRef.current.addEventListener('scroll', update);
      tabsRef.current.addEventListener('mousewheel', update);
      window.addEventListener('resize', update);
    }

    return () => {
      if (tabsRef && tabsRef.current) {
        tabsRef.current.removeEventListener('scroll', update);
        tabsRef.current.removeEventListener('mousewheel', update);
      }

      window.removeEventListener('resize', update);
    };
  }, [tabsRef]);

  useEffect(scrollCurrentIntoView, [activeKey]);

  useEffect(() => {
    setActiveKey(activeKeyProp);
  }, [activeKeyProp]);

  function getTab(tabs: CubeTabData[], key: string): CubeTabData | undefined {
    return tabs.find((tab) => tab.id === key);
  }

  function setTab(key: string) {
    if (getTab(tabs, key)) {
      setActiveKey(key);
    }
  }

  function addTab(tab: CubeTabData) {
    setTabs((tabs) => {
      if (!getTab(tabs, tab.id)) {
        return [...tabs, tab];
      }

      return tabs;
    });
  }

  function removeTab(tab: CubeTabData) {
    setTabs((tabs) => {
      const _tabs = tabs.filter((_tab) => _tab.id !== tab.id);

      setActiveKey((prevActiveKey) => {
        if (prevActiveKey === tab.id) {
          return _tabs[0] && _tabs[0].id;
        }

        return prevActiveKey;
      });

      return _tabs;
    });
  }

  function changeTab(tab: CubeTabData) {
    setTabs((tabs) => {
      const existTab = tabs.find((_tab) => _tab.id === tab.id);

      if (existTab) {
        Object.assign(existTab, tab);
      }

      return [...tabs];
    });
  }

  function onPress(tab: CubeTabData) {
    onTabClick && onTabClick(tab.id);
    setTab(tab.id);
  }

  return (
    <Flex
      flow="column"
      height="max 100%"
      width="max 100%"
      data-is-left-fade={leftFade || null}
      data-is-right-fade={rightFade || null}
      css={TABS_CONTAINER_CSS}
      {...props}
    >
      <TabsContext.Provider
        value={{
          addTab,
          setTab,
          removeTab,
          changeTab,
          currentTab: activeKey,
        }}
      >
        <Space gap=".5x" placeContent="center space-between">
          <Space ref={tabsRef} gap="1x" flexShrink={0} css={TABS_PANEL_CSS}>
            {tabs.map((tab) => {
              return (
                <Tab
                  data-qa={tab.qa}
                  onPress={() => onPress(tab)}
                  key={tab.id}
                  isSelected={tab.id === activeKey || false}
                  isDisabled={tab.isDisabled}
                  isHidden={tab.isHidden}
                >
                  {tab.title}
                </Tab>
              );
            })}
          </Space>
          {extra}
        </Space>
        <Flex
          flexFrow="1"
          border="top rgb(227, 227, 233)"
          {...(paneStyles || {})}
        >
          {children}
        </Flex>
      </TabsContext.Provider>
    </Flex>
  );
}

Tabs.TabPane = function FileTabPane({
  id,
  tab,
  qa,
  isHidden,
  isDisabled,
  children,
  ...props
}) {
  const { addTab, removeTab, changeTab, currentTab } = useContext(TabsContext);

  useEffect(() => {
    const tabData = {
      id,
      qa,
      title: tab,
      isDisabled,
      isHidden,
    };

    addTab(tabData);

    return () => {
      removeTab(tabData);
    };
  }, [id]);

  useEffect(() => {
    changeTab({
      id,
      qa,
      title: tab,
      isDisabled,
      isHidden,
    });
  }, [tab, isDisabled, isHidden]);

  const isCurrent = id === currentTab;

  return (
    <Block
      style={{ display: isCurrent ? 'block' : 'none' }}
      flexGrow={1}
      {...props}
    >
      {children}
    </Block>
  );
};
