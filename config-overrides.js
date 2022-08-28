const {alias} = require('react-app-rewire-alias')

module.exports = function override(config, env) {
    alias({
        '@': 'src',
        '@app': 'src/app',
        '@assets': 'src/assets',
        '@styles': 'src/styles',
        '@features': 'src/features',
        '@pages': 'src/components/pages',
        '@atoms': 'src/components/UI/atoms',
        '@molecules': 'src/components/UI/molecules',
        '@organisms': 'src/components/UI/organisms',
    })(config)

    return config;
}