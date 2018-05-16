export function initialize(applicationInstance) {
  let store = applicationInstance.lookup('service:store');
  let shoebox = applicationInstance.lookup('service:fastboot').get('shoebox');

  shoebox.put('ember-data-store', {
    get records() {
      const modelNames = applicationInstance.lookup('data-adapter:main').getModelTypes().mapBy('name');
      return modelNames.map(name => {
        return store.peekAll(name).toArray();
      }).reduce((a,b) => a.concat(b), [])
        .filter(record => record.get('isLoaded') && !record.get('isNew'))
        .map(record => record.serialize({ includeId: true}))
        .reduce((a,b) => { a.data.push(b.data); return a; }, { data: [] });
    }
  });
}

export default {
  name: 'ember-data-fastboot',
  initialize
};
