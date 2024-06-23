import { Product } from "../models/productSchema.js";

//get all products
async function products(req, res) {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const filter = {};
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  try {
    // Handle month filter if provided and valid
    if (month && parseInt(month) >= 1 && parseInt(month) <= 12) {
      filter.$expr = {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      };
    }

    // Handle search criteria if search parameter is provided
    if (search) {
      const parsedNumber = parseInt(search);

      if (!isNaN(parsedNumber)) {
        // If the search parameter is a valid number, search by price
        filter.price = parsedNumber;
      } else {
        // If the search parameter is not a number, search by title or description
        const regex = new RegExp(search, "i");
        filter.$or = [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
        ];
      }
    }

    // Fetch products based on the constructed filter
    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(Number(perPageNumber));

    res.status(200).json({
      totalCount,
      currentPage: pageNumber,
      perPage: perPageNumber,
      totalPages: Math.ceil(totalCount / perPageNumber),
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
}

//get products statistics for month query
async function statistics(req, res) {
  const { month } = req.query;

  try {
    const statistics = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$price" },
          totalSoldItems: {
            $sum: { $cond: { if: "$sold", then: 1, else: 0 } },
          },
          totalNotSoldItems: {
            $sum: { $cond: { if: { $not: "$sold" }, then: 1, else: 0 } },
          },
        },
      },
    ]);

    if (statistics.length > 0) {
      res.status(200).json(statistics[0]);
    } else {
      res.status(404).json({ error: "No statistics found" });
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Error fetching statistics" });
  }
}

//get products barchart for month query
async function barchart(req, res) {
  const { month } = req.query;

  try {
    const products = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
    });

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    products.forEach((product) => {
      if (product.price <= 100) priceRanges["0-100"]++;
      else if (product.price <= 200) priceRanges["101-200"]++;
      else if (product.price <= 300) priceRanges["201-300"]++;
      else if (product.price <= 400) priceRanges["301-400"]++;
      else if (product.price <= 500) priceRanges["401-500"]++;
      else if (product.price <= 600) priceRanges["501-600"]++;
      else if (product.price <= 700) priceRanges["601-700"]++;
      else if (product.price <= 800) priceRanges["701-800"]++;
      else if (product.price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    // Convert priceRanges object to the desired array format (only for barchart)
    const response = Object.entries(priceRanges).map(([label, value]) => ({
      label,
      value,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error generating bar chart data" });
  }
}

//get products piechart for month query
async function piechart(req, res) {
  const { month } = req.query;

  try {
    const products = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
    });

    const categoryCounts = {};

    products.forEach((product) => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });

    // Convert categoryCounts object to the desired array format
    const response = Object.keys(categoryCounts).map((c) => ({
      label: c,
      value: categoryCounts[c],
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating pie chart data:", error);
    res.status(500).json({ error: "Error generating pie chart data" });
  }
}

//get products combined data for month query
async function combined(req, res) {
  const { month } = req.query;
  try {
    // Fetch statistics for the given month
    const statistics = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$price" },
          totalSoldItems: { $sum: 1 },
        },
      },
    ]);

    // Fetch bar chart data (price ranges) for the given month
    const barChartData = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            101,
            201,
            301,
            401,
            501,
            601,
            701,
            801,
            901,
            Infinity,
          ],
          default: "Other",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    // Fetch pie chart data (category counts) for the given month
    const pieChartData = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      statistics: statistics[0], // take the first element from statistics array
      barChartData,
      pieChartData,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Error fetching combined data" });
  }
}

export default {
  products,
  statistics,
  barchart,
  piechart,
  combined,
};
