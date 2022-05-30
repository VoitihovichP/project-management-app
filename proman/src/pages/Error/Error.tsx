import React, { FC } from 'react';
import { injectIntl } from 'react-intl';
import './error.scss';

const Error: FC = injectIntl(({ intl }) => {
  return (
    <main className="error-page">
      <h2 className="error-page_title">404</h2>
      <h3 className="error-page_description__1">
        {intl.formatMessage({ id: 'ERROR_PAGE_DESCRIPTION_1' })}
      </h3>
      <h4 className="error-page_description__2">
        {intl.formatMessage({ id: 'ERROR_PAGE_DESCRIPTION_2' })}
      </h4>
    </main>
  );
});

export default Error;
