const { withPodfile } = require('@expo/config-plugins');

module.exports = function withIosPodTarget(config) {
  return withPodfile(config, (config) => {
    const contents = config.modResults.contents;
    const postInstallStart = contents.indexOf('  post_install do |installer|');
    const targetEnd = contents.indexOf('\n  end\nend', postInstallStart);
    if (postInstallStart < 0 || targetEnd < 0) {
      throw new Error('Unable to find the iOS Podfile post_install block');
    }

    const enforcement = `
    # Xcode 27 no longer supports simulator deployment targets below iOS 15.
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.1'
      end
    end`;
    config.modResults.contents =
      contents.slice(0, targetEnd) + enforcement + contents.slice(targetEnd);
    return config;
  });
};
