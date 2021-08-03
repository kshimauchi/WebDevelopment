#### If you rebuild the @ticket-share service

##### Be sure to update the auth service here

##### exec: npm update @ticket-share/common

#### Verify: versioning of the build:

<p>
navigate to auth dir: 
exec: kubectl get pods
kubectl exec -it auth-depl-"pod name" sh <--opens shell
should see /apps
cd node_modules
cd @ticket-share/common
ls
cat package.json,
should be able to verify the version
</p>
