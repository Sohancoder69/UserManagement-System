const customer = require('../models/customer');
const Customer = require('../models/customer')
const moongoose = require('mongoose')


/**
 * GET Homepage
 */

exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

  const locals = {
    title: ' NodeJs',
    description: 'Free NodeJs User Mangement System'
  }

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.countDocuments();
    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {

  const locals = {
    title: ' Add New Customer - NodeJs',
    description: 'Free NodeJs User Mangement System'
  }
  res.render('customer/add', locals);

}


/**
 * POST /
 * Create New Customer Form
 */

exports.postCustomer = async (req, res) => {

  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  })

  try {
    await Customer.create(newCustomer);
    res.redirect('/');
    await req.flash('info', 'New Customer Has Been Added')

  } catch (error) {
    console.log(error);
  }
}


/**
 * GET /
 * Customer Data
 */

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: ' View Customer Data ',
      description: 'Free NodeJs User Mangement System'
    }

    res.render('customer/view', {
      locals,
      customer,
    })
  } catch (error) {
    console.log();
  }
}

exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    const locals = {
      title: ' View Customer Data ',
      description: 'Free NodeJs User Mangement System'
    }

    res.render('customer/edit', {
      locals,
      customer,
    })


  } catch (error) {
    console.log();
  }
}

/**
 * GET /
 * Update Customer Data
 */

exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    }).where();
    await res.redirect(`/edit/${req.params.id}`)
    // console.log('redirected');
  } catch (error) {
    console.log();
  }
}


/**
 * GET /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id })
    res.redirect('/')
  } catch (error) {
    console.log();
  }
}

/** 
 * GET /
 * Search Customer Data
 */

exports.searchCustomer = async (req, res) => {

  const locals = {
    title: ' Search Customer Data ',
    description: 'Free NodeJs User Mangement System'
  }
  try {
    const searchTerm = req.body.searchTerm
    const searchNoSpecialChars = searchTerm.replace(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChars, "i") } }
      ]
    })
    res.render('search', {
      locals,
      customers
    })
  } catch (error) {
    console.log(error);
  }
}



/** 
 * GET /
 * About Page
 */

exports.aboutPage = async (req, res) => {

  const locals = {
    title: ' About Page',
    description: 'Free NodeJs User Mangement System'
  }

  try {
    res.render('about', locals)
  } catch (error) {
    console.log(error);
  }

}
