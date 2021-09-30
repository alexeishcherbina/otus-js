function maxItemAssociation(itemsList) {
	function intersection(listA, listB) { // listA, listB - arrays
		return listA.some(x => listB.includes(x));
	}

	let recommendations = [itemsList[0]];
	let maxLength = itemsList[0].length;
	for (let i = 1; i < itemsList.length; i++) {
		let hasIntersection = false;
		let j = 0;
		while (j < recommendations.length && !hasIntersection) {
			if (intersection(recommendations[j], itemsList[i])) {
				hasIntersection = true;
				recommendations[j] = [...new Set([...recommendations[j], ...itemsList[i]])];
				if (recommendations[j].length > maxLength) {
					maxLength = recommendations[j].length;
				}
			}
			j++;
		}
		if (!hasIntersection) {
			recommendations.push(itemsList[i]);
			if (itemsList[i].length > maxLength) {
				maxLength = itemsList[i].length;
			}
		}
	}

	if (itemsList.join() === recommendations.join()) { // if we don't have any intersections
		return recommendations.filter(list => list.length === maxLength)
						.map(list => list.sort().join(','))
						.sort()[0].split(',');
	} else {
		return maxItemAssociation(recommendations);  // if we have intersections let's try to find any more
	}
}