#!/bin/bash

# Set some colors for text formatting
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

cd ../

# Build entire FirstVoices package.
echo 'Building entire package '
if [ "$1" == "-skip-tests" ]; then

    echo '** SKIPPING TESTS **'

    if [ "$2" == "-minimal" ]; then
      echo '** BUILDING MINIMAL PACKAGES **'
      mvn clean install -DskipTests -P '!full,!full-marketplace'
    else
      mvn clean install -DskipTests
    fi

    if [[ "$?" -ne 0 ]]; then
        echo
        echo -e "${RED}fv-web-ui build failed \n${ENDCOLOR}"; exit 1
        echo
    fi
    echo ''
else

    if [ "$1" == "-minimal" ]; then
      echo '** BUILDING MINIMAL PACKAGES **'
      mvn clean install -P '!full,!full-marketplace'
    else
      mvn clean install
    fi

    if [[ "$?" -ne 0 ]]; then
        echo
        echo -e "${RED}fv-web-ui build failed \n${ENDCOLOR}"; exit 1
        echo
    fi
    echo ''
fi

echo 'Removing old modules from docker container if they exist.'
docker exec nuxeo-dev /bin/bash -c "rm /opt/nuxeo/server/nxserver/bundles/FirstVoices*.jar /opt/nuxeo/server/nxserver/bundles/firstvoices*jar" > /dev/null 2>&1
echo ''

echo 'Copying build package into shared docker volume.'
cp firstvoices-marketplace/target/firstvoices-marketplace-package-latest.zip docker/nuxeo_dev_docker

echo 'Installing new package and restarting server.'
docker exec nuxeo-dev /bin/bash -c "nuxeoctl stop && nuxeoctl mp-remove first-voices-package && nuxeoctl mp-install --accept=yes /opt/nuxeo/server/nxserver/tmp/firstvoices-marketplace-package-latest.zip && nuxeoctl start"

echo ''
echo -e "---------------------------------------------------------------"
echo -e "${GREEN}Package built and deployed to docker container successfully.${ENDCOLOR}"
echo -e "---------------------------------------------------------------"
exit 0
