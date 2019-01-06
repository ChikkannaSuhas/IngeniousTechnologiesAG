'use strict';

exports.deny_absence_of_tolerations = function deny_absence_of_tolerations (req, res) {


  var admissionRequest = req.body;


  var str = JSON.stringify(admissionRequest);
  console.log(`printing the request object:-`);
  console.log(`This was the ${str} request object`);


  // Get a reference to the workload spec
  var object = admissionRequest.request.object;
  var object1 = JSON.stringify(admissionRequest.request.object);

  console.log(`printing the object obtained from admissionResquest:-`);
  console.log(`This was the ${object1} request object`);


  console.log(`validating the ${object.metadata.name} workload`);
  var workloadSpec = JSON.stringify(object.spec.template.spec);
  console.log(`The content is ${workloadSpec}`);

  var admissionResponse = {
    allowed: false
  };

  var found = false;

  if (!object.spec.template.spec.tolerations) {

      console.log(`Workload is not using tolerations`);

      admissionResponse.status = {
        status: 'Failure',
          message: `On Staging/Testing please use tolerations, this reduces infrastructure costs. To get rid of this error use the link:- https://github.com/Suhas-Git/IngeniousTechnologiesAG/blob/master/define_tolerations_for_workload.yaml`,
        reason: ` Workload ( ie.,deployment/statefulsets/replicationcontoller/replicaset ) Requirement Failed`,
        code: 402
      };

      found = true;

  };

  if (!found) {
    admissionResponse.allowed = true;
  }

  var admissionReview = {
    response: admissionResponse
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(admissionReview));
  res.status(200).end();
};
