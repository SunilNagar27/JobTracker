# Jenkins with every tool the JobTracker pipeline needs baked in:
# docker CLI, node, aws CLI, kubectl, trivy, gitleaks, sonar-scanner, envsubst.
FROM jenkins/jenkins:lts-jdk17

USER root

ARG SONAR_SCANNER_VERSION=6.2.1.4610

RUN apt-get update && apt-get install -y --no-install-recommends \
      curl unzip gnupg ca-certificates gettext-base jq git \
    && rm -rf /var/lib/apt/lists/*


# Docker CLI only (the daemon is the host's, via the mounted socket)
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
       > /etc/apt/sources.list.d/docker.list \
    && apt-get update && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# AWS CLI v2 (uname -m is x86_64 or aarch64, which matches AWS's file names)
RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o /tmp/awscli.zip \
    && unzip -q /tmp/awscli.zip -d /tmp && /tmp/aws/install && rm -rf /tmp/aws /tmp/awscli.zip

# kubectl, latest 1.35.x to match the EKS version (kubectl may differ by one minor version)
RUN ARCH=$(dpkg --print-architecture) \
    && KVER=$(curl -fsSL https://dl.k8s.io/release/stable-1.35.txt) \
    && curl -fsSLo /usr/local/bin/kubectl "https://dl.k8s.io/release/${KVER}/bin/linux/${ARCH}/kubectl" \
    && chmod +x /usr/local/bin/kubectl

# Trivy (vulnerability scanner)
RUN curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh \
    | sh -s -- -b /usr/local/bin


# SonarScanner CLI (platform-independent zip; uses the JDK 17 already in this image)
RUN curl -fsSL "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip" -o /tmp/sonar.zip \
    && unzip -q /tmp/sonar.zip -d /opt && rm /tmp/sonar.zip \
    && ln -s /opt/sonar-scanner-${SONAR_SCANNER_VERSION}/bin/sonar-scanner /usr/local/bin/sonar-scanner

USER jenkins

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt
