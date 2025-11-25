class ChartsComponent {
  renderRevenueChart() {
    const svg = d3.select("#revenue-chart")
      .html("") // Clear previous content
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    const x = d3.scaleBand()
      .domain(mockData.revenueData.map(d => d.month))
      .range([0, chartWidth])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(mockData.revenueData, d => d.revenue)])
      .nice()
      .range([chartHeight, 0]);
    
    // Add area
    const area = d3.area()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y0(y(0))
      .y1(d => y(d.revenue))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(mockData.revenueData)
      .attr("fill", "rgba(76, 175, 80, 0.1)")
      .attr("stroke", "none")
      .attr("d", area);
    
    // Add line
    const line = d3.line()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y(d => y(d.revenue))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(mockData.revenueData)
      .attr("fill", "none")
      .attr("stroke", "#4CAF50")
      .attr("stroke-width", 2)
      .attr("d", line);
    
    // Add circles
    g.selectAll(".dot")
      .data(mockData.revenueData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.month) + x.bandwidth() / 2)
      .attr("cy", d => y(d.revenue))
      .attr("r", 4)
      .attr("fill", "#4CAF50");
    
    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("fill", "#666");
    
    // Add y-axis
    g.append("g")
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${(d / 1000).toFixed(0)}k`))
      .selectAll("text")
      .style("fill", "#666");
  }
}