const social = {
  facebook: {
    icon: 'mdi-facebook',
    title: 'Facebook'
  },
  instagram: {
    icon: 'mdi-instagram',
    title: 'Instagram'
  },
  linkedIn: {
    icon: 'mdi-linkedin',
    title: 'LinkedIn'
  },
  twitter: {
    icon: 'mdi-twitter',
    title: 'Twitter'
  }
};

export const getSocial = socialLinks => {
  return Object.keys(socialLinks).map(key => ({
    ...social[key],
    link: socialLinks[key]
  }));
};
