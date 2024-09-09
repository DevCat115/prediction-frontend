import { useState } from 'react';
import TextIconButton from '../buttons/TextIconButton';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------------------------

interface IProps extends IPropsOfComponent {
  title: string;
  collapsible: boolean;
}

// ----------------------------------------------------------------------------------------

export default function CollapsibleBoard({ className = '', title = '', collapsible = false, children }: IProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <div className={`border border-gray-900 rounded-lg flex flex-col ${className}`}>
      <div className="bg-[#212121] py-3 px-4 flex items-center justify-between rounded-t-lg">
        <h1 className="text-gray-100 text-lg font-bold">{title}</h1>
        {collapsible && (
          <TextIconButton className="text-base" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <Icon icon="bxs:up-arrow" />
            ) : (
              <Icon icon="bxs:down-arrow" />
            )}
          </TextIconButton>
        )}
      </div>

      {collapsed ? <></> : (
        <div className="flex-1">
          {children}
        </div>
      )}
    </div>
  )
}