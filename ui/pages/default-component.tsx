/* eslint-disable react/display-name */
export const DefaultComponent =
  (role: string) =>
  ({ location: { pathname } }: any) => {
    return (
      <div>
        <p>page for {role}</p>
        <p>pathname : {pathname}</p>
        <p>wait for implementation</p>
      </div>
    );
  };
