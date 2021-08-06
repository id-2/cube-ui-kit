import { Base } from '../../components/Base';
import { CloudLogo } from '../../atoms/CloudLogo/CloudLogo';
import { Space } from '../../components/Space';
import { CONTAINER_STYLES } from '../../styles/list';
import { extractStyles } from '../../utils/styles';
import { NuStyles } from '../../styles/types';
import { BaseProps, ContainerStyleProps } from '../../components/types';

const DEFAULT_STYLES: NuStyles = {
  display: 'flex',
  flow: 'row',
  gap: '1x',
  placeContent: 'space-between',
  placeItems: 'center',
  padding: '1x 1.5x',
  fill: '#white',
};

export interface CubeTopbarProps extends BaseProps, ContainerStyleProps {
  onLogoPress?: () => void;
}

export function TopBar({ children, onLogoPress, ...props }: CubeTopbarProps) {
  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES);

  return (
    <Base role="banner" styles={styles} {...props}>
      <CloudLogo onPress={onLogoPress} />
      <Space flexGrow={1} placeContent="space-between">
        {children}
      </Space>
    </Base>
  );
}
