{
	"subj": {
		"values": [{
				"label": "Oracle",
					"children": {
					"pred": {
						"values": [{
								"label": "is a",
									"children": {
									"obj": {
										"values": [{
												"label": "Company"
													}]
											}
								}
							},{
								"label": "is described as",
									"children": {
									"obj": {
										"values": [{
												"label": "A database company"
													}]
											}
								}
							}],
							"meta": {
							"more": 4,
								"url": "http://api.bill-boyer.com/facts/1/search/pred?subj=Oracle&start=2"
								}
					}
				}
			},{
				"label": "Microsoft",
					"children": {
					"pred": {
						"values": [{
								"label": "invented",
									"children": {
									"obj": {
										"values": [{
												"label": ".NET"
													},{
												"label": "XYZ"
													},{
												"label": "ABC"
													}],
											"meta": {
											"more": 10,
												"url": "http://api.bill-boyer.com/facts/1/search/obj?subj=Oracle&pred=invented&start=3"
												}
									}
								}
							}]
							}
				}
			}],
			"meta": {
			"more": 6,
				"url": "http://api.bill-boyer.com/facts/1/search/subj?subj=Ora%&start=2"
				}
	},
		"obj": {
			"values": [{
					"label": "Oracle",
						"children": {
						"pred": {
							"values": [{
									"label": "works at",
										"children": {
										"subj": {
											"values": [{
													"label": "Larry Ellison"
														}]
												}
									}
								},{
									"label": "founded",
										"children": {
										"subj": {
											"values": [{
													"label": "Larry Ellison"
														}]
												}
									}
								}],
								"meta": {
								"more": 2,
									"url": "http://api.bill-boyer.com/facts/1/search/pred?obj=Oracle&start=2"
									}
						}
					}
				},{
					"label": "Microsoft",
						"children": {
						"pred": {
							"values": [{
									"label": "works at",
										"children": {
										"subj": {
											"values": [{
													"label": "Bill Gates"
														},{
													"label": "Steve Ballmer"
														},{
													"label": "Paul Allen"
														}],
												"meta": {
												"more": 5,
													"url": "http://api.bill-boyer.com/facts/1/search/subj?obj=Microsoft&pred=works%20at&start=3"
													}
										}
									}
								}]
								}
					}
				}],
				"meta": {
				"more": 6,
					"url": "http://api.bill-boyer.com/facts/1/search/obj?obj=Ora%&start=2"
					}
		}
}

