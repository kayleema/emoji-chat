jsbuild:
	cd client && npm run build;

javabuild: jsbuild
	gradle build;

cfbluegreendeploy: javabuild
	cf blue-green-deploy emoji

cfdeploy: javabuild
	cf push;
