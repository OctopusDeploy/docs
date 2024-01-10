### Debian

<details data-group="quickstart-debian">
<summary>Listening deployment target</summary>

```bash
serverUrl="https://my-octopus"   # The url of your Octopus server
thumbprint=""       # The thumbprint of your Octopus Server
apiKey=""           # An Octopus Server api key with permission to add machines
spaceName="Default" # The name of the space to register the Tentacle in
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

apt-get update && apt-get install --no-install-recommends gnupg curl ca-certificates apt-transport-https && \
  install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://apt.octopus.com/public.key | sudo gpg --dearmor -o /etc/apt/keyrings/octopus.gpg

chmod a+r /etc/apt/keyrings/octopus.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/octopus.gpg] https://apt.octopus.com/ \
  stable main" | \
  tee /etc/apt/sources.list.d/octopus.list > /dev/null

# for legacy Ubuntu (< 18.04) use
# apt-key adv --fetch-keys https://apt.octopus.com/public.key
# add-apt-repository "deb https://apt.octopus.com/ stable main"

apt-get update
apt-get install tentacle

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --space "$spaceName" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle service --install --start
```

</details>
<details data-group="quickstart-debian">
<summary>Polling deployment target</summary>

```bash
serverUrl="https://my-octopus"   # The url of your Octopus server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
spaceName="Default" # The name of the space to register the Tentacle in
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

apt-key adv --fetch-keys https://apt.octopus.com/public.key
add-apt-repository "deb https://apt.octopus.com/ stretch main"
apt-get update
apt-get install tentacle

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True --reset-trust --app "$applicationPath"
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --space "$spaceName" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle service --install --start
```

</details>
<details data-group="quickstart-debian">
<summary>Listening worker</summary>

```bash
serverUrl="https://my-octopus"   # The url of your Octopus server
thumbprint=""       # The thumbprint of your Octopus Server
apiKey=""           # An Octopus Server api key with permission to add machines
spaceName="Default" # The name of the space to register the Tentacle in
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

apt-key adv --fetch-keys https://apt.octopus.com/public.key
add-apt-repository "deb https://apt.octopus.com/ stretch main"
apt-get update
apt-get install tentacle

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in worker pool $workerPool"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --space "$spaceName" --name "$name" --workerPool "$workerPool"
/opt/octopus/tentacle/Tentacle service --install --start
```

</details>
<details data-group="quickstart-debian">
<summary>Polling worker</summary>

```bash
serverUrl="https://my-octopus"   # The url of your Octopus server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
spaceName="Default" # The name of the space to register the Tentacle in
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

apt-key adv --fetch-keys https://apt.octopus.com/public.key
add-apt-repository "deb https://apt.octopus.com/ stretch main"
apt-get update
apt-get install tentacle

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True --reset-trust --app "$applicationPath"
echo "Registering the Tentacle $name with server $serverUrl in worker pool $workerPool"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --space "$spaceName" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle service --install --start
```

</details>
