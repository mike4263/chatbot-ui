import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Brand,
  Button,
  Masthead,
  MastheadBrand,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Page,
  SkipToContent,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons';
import { Properties } from '@app/Properties';
import { SidebarWithFlyout } from '@app/SidebarWithFlyout/SidebarWithFlyout';
import { AppDataProvider } from '@app/AppData/AppDataContext';

const AppLayout: React.FunctionComponent = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // If you close the sidebar on mobile and go back to desktop, you lose it forever (or at least until reload)
  // This forces it to reopen if that happens.
  React.useEffect(() => {
    const updateSidebar = () => {
      if (window.innerWidth >= 1200 && !Properties.disableSidebar) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', updateSidebar);

    return () => {
      window.removeEventListener('resize', updateSidebar);
    };
  }, []);

  const masthead =  ( disableSidebar: boolean ) => (
    <Masthead display={{ default: 'inline' }}>
      <MastheadMain>
        { !disableSidebar &&
        <MastheadToggle>
          <Button
            icon={<BarsIcon />}
            variant="plain"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Global navigation"
          />
        </MastheadToggle>
        }
        <MastheadBrand data-codemods>
          <MastheadLogo data-codemods>
            <div className="show-light">
              <Brand src={Properties.logoWhiteUrl} alt="Red Hat Composer AI Studio" heights={{ default: '36px' }} />
            </div>
            <div className="show-dark">
              <Brand src={Properties.logoDarkUrl} alt="Red Hat Composer AI Studio" heights={{ default: '36px' }} />
            </div>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const Sidebar = <SidebarWithFlyout />;

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent
      onClick={(event) => {
        event.preventDefault();
        const primaryContentContainer = document.getElementById(pageId);
        primaryContentContainer && primaryContentContainer.focus();
      }}
      href={`#${pageId}`}
    >
      Skip to Content
    </SkipToContent>
  );

  return (
    <AppDataProvider>
      <Page
        className="chatbot-ui-page"
        mainContainerId={pageId}
        masthead={masthead(Properties.disableSidebar)}
        sidebar={sidebarOpen && Sidebar}
        skipToContent={PageSkipToContent}
        isContentFilled
      >
        <Outlet />
      </Page>
    </AppDataProvider>
  );
};

export { AppLayout };
