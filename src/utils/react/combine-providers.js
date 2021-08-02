export function combineProviders(providers) {
  return providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
}
