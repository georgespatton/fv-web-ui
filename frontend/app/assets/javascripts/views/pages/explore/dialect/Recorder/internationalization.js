const copy = {
  detail: {
    biography: 'Recorder description',
    name: 'Recorder name',
    title: 'Recorder',
    profilePhoto: 'Recorder Photo',
    isTrashed: 'This recorder has been deleted',
  },
  create: {
    btnBack: '< Back',
    description: 'Recorder description',
    name: 'Recorder name',
    submit: 'Create new recorder',
    title: 'Create a new recorder',
    profilePhoto: 'Recorder photo',
    success: {
      linkCreateAnother: 'Want to create another recorder?',
      linkProfile: 'Profile',
      linkEdit: 'Edit',
      noName: '(No name)',
      thanks: 'Thanks for creating a recorder. Your contributions help make the site better!',
      title: 'We created a new recorder',
      review: 'Here is what you submitted:',
    },
  },
  edit: {
    btnBack: '< Back',
    description: 'Recorder description',
    isTrashed: 'This recorder has been deleted and can not be edited',
    name: 'Recorder name',
    submit: 'Edit recorder',
    isConfirmOrDenyTitle: 'Delete Recorder?',
    btnInitiate: 'Delete',
    btnDeny: 'No, do not delete the recorder',
    btnConfirm: 'Yes, delete the recorder',
    title: 'Edit a recorder',
    profilePhotoCurrent: 'Current recorder photo',
    profilePhoto: 'Recorder photo',
    profilePhotoExists: 'Replace current recorder photo',
    success: {
      linkCreateAnother: 'Made a mistake? Edit the recorder again',
      noName: '(No name)',
      thanks: 'Thanks for updating a recorder. Your contributions help make the site better!',
      title: 'We updated the recorder',
      review: 'Here is what you submitted:',
    },
    successDelete: {
      title: 'We deleted the recorder',
    },
  },
  errorBoundary: {
    explanation: "Sorry about this, but we can't create any new recorders at the moment.",
    optimism: 'The issue should be fixed shortly.',
    title: 'We encountered a problem',
  },
  loading: 'Loading',
  validation: {
    name: 'Please provide a name for the recorder',
  },
}
export default copy
