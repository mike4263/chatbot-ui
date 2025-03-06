import { ActionGroup, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import * as React from 'react';

interface FlyoutFooterProps {
  primaryButton: string;
  onPrimaryButtonClick: () => void;
  secondaryButton?: string;
  onSecondaryButtonClick?: () => void;
  dangerSecondaryButton?: string;
  onDangerSecondaryButtonClick?: () => void;
  thirdButton?: string;
  thirdButtonClick?: () => void;
  isPrimaryButtonDisabled?: boolean;
  isThirdButtonDisabled?: boolean;
}
export const FlyoutFooter: React.FunctionComponent<FlyoutFooterProps> = ({
  primaryButton,
  onPrimaryButtonClick,
  secondaryButton,
  onSecondaryButtonClick,
  dangerSecondaryButton,
  thirdButtonClick,
  thirdButton,
  onDangerSecondaryButtonClick,
  isPrimaryButtonDisabled,
  isThirdButtonDisabled,
}: FlyoutFooterProps) => {
  return (
    <div className="flyout-footer">
      <ActionGroup className={css('flyout-footer-action-group', secondaryButton && 'space-between')}>
        {secondaryButton && onSecondaryButtonClick && (
          <Button variant="secondary" onClick={onSecondaryButtonClick}>
            {secondaryButton}
          </Button>
        )}
        {dangerSecondaryButton && onDangerSecondaryButtonClick && (
          <Button variant="secondary" isDanger onClick={onDangerSecondaryButtonClick}>
            {dangerSecondaryButton}
          </Button>
        )}

        {thirdButton && thirdButtonClick && (
          <Button isDisabled={isThirdButtonDisabled} variant="tertiary" onClick={thirdButtonClick}>
            {thirdButton}
          </Button>
        )}

        <Button isDisabled={isPrimaryButtonDisabled} onClick={onPrimaryButtonClick}>
          {primaryButton}
        </Button>
      </ActionGroup>
    </div>
  );
};
